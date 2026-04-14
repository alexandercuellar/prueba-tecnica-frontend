import { StudentService } from './../../../Core/services/student.service';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentResponse } from '../../../shared/models/student-response.model';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-student-directory',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-directory.html',
  styleUrls: ['./student-directory.css']
})
export class StudentDirectoryComponent implements OnInit {
students  : StudentResponse[] = [];
loading = false;
errorMessage = '';
search = '';

currentPage = 1;
pageSize = 3;

constructor(private studentService: StudentService,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  get paginatedStudents() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.students.slice(start, end);
}


  loadStudents(): void {
    this.loading = true;
    this.errorMessage = '';

    this.studentService.getStudents().subscribe({
      next: (res: any) => {
        this.students = (res.data || []).map((x: any) => ({
        fullName: x.fullName,
        programName: x.programaName,
        totalCredits: x.totalCreditos,
        subjects: x.subjects
      }));
        this.loading = false;
this.cdr.detectChanges();
      },

      error: (err: any) => {
        this.loading = false;
        console.error('error al cargar estudiantes', err);
        this.errorMessage = 'Error al cargar estudiantes';
      }
    });
  }
}
