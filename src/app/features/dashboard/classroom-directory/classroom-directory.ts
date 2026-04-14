import { StudentService } from './../../../Core/services/student.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Toast } from '../../../shared/components/toast/toast';

@Component({
  selector: 'app-classroom-directory',
  imports: [CommonModule, Toast],
  templateUrl: './classroom-directory.html',
  styleUrl: './classroom-directory.css',
})
export class ClassroomDirectoryComponent implements OnInit {
  @ViewChild(Toast) toast!: Toast;
  private studentService = inject(StudentService);
  private cdr = inject(ChangeDetectorRef);

  subjects: any[] = [];
  selectedSubjects: any[] = [];
  registeredSubjects: number[] = [];

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.studentService.getActiveSubjects().subscribe({
      next: (res) => {
        this.subjects = [...res.data];

        this.loadStudentSubjects();

        this.cdr.detectChanges();
      },
      error: (err) => {
      }
    });
  }

  loadStudentSubjects() {
    const userId = this.getUserId();

    this.studentService.getStudentSubjects(userId).subscribe({
      next: (res) => {
        const existing = res.data;
        this.registeredSubjects = existing.map((e: any) => e.id);
        this.selectedSubjects = this.subjects.filter(s =>
          this.registeredSubjects.includes(s.id)
        );
        this.cdr.detectChanges();
      }
    });
  }

  toggleSubject(subject: any) {

    if (this.isRegistered(subject)) return;

    const exists = this.selectedSubjects.find(s => s.id === subject.id);
    if (exists) {
      this.selectedSubjects = this.selectedSubjects.filter(s => s.id !== subject.id);
      return;
    }


    const registered = this.subjects.filter(s =>
      this.registeredSubjects.includes(s.id)
    );

    const allSubjects = [...this.selectedSubjects, ...registered];

    const alreadyHasTeacher = allSubjects.some(
      s => s.idTeacher === subject.idTeacher
    );

    if (alreadyHasTeacher) {
      this.toast.show(
        'Regla académica',
        'Solo puedes tener una materia por docente',
        'warning'
      );
      return;
    }

    if (this.totalCredits + subject.credits > 9) {
      this.toast.show(
  'Límite alcanzado',
  'Máximo 3 materias (9 créditos)',
  'warning'
);
      return;
    }

    this.selectedSubjects = [...this.selectedSubjects, subject];
  }

  isSelected(subject: any): boolean {
    return this.selectedSubjects.some(s => s.id === subject.id);
  }

  isRegistered(subject: any): boolean {
    return this.registeredSubjects.includes(subject.id);
  }

  get totalCredits(): number {
    return this.selectedSubjects.reduce((acc, s) => acc + s.credits, 0);
  }

  get isMaxCredits(): boolean {
    return this.totalCredits >= 9;
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : 0;
  }
  registerSubjects() {
    const userId = this.getUserId();

    const newSubjects = this.selectedSubjects.filter(
      s => !this.registeredSubjects.includes(s.id)
    );

    if (newSubjects.length === 0) {
      this.toast.show(
  'Sin cambios',
  'No hay materias nuevas para registrar',
  'warning'
);
      return;
    }

    if (this.totalCredits > 9) {
     this.toast.show(
  'Error',
  'Excedes el límite de créditos',
  'error'
);
      return;
    }

    const payload = {
      studentId: userId,
      subjecIds: newSubjects.map(s => s.id)
    };


    this.studentService.registerSubjects(payload).subscribe({
      next: (res) => {
        this.toast.show(
  'Registro exitoso',
  'Las materias fueron registradas correctamente',
  'success'
);
        this.loadSubjects();
      },
      error: (err) => {
        this.toast.show(
  'Error',
  'No se pudieron registrar las materias',
  'error'
);
      }
    });
  }
}
