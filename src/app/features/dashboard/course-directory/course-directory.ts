import { StudentService } from './../../../Core/services/student.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-course-directory',
  imports: [RouterModule, CommonModule],
  templateUrl: './course-directory.html',
  styleUrls: ['./course-directory.css'],
})
export class CourseDirectoryComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  subjects: any[] = [];

  ngOnInit(): void {
    this.loadStudentSubjects();
  }
  loadStudentSubjects() {
    const userId = this.getUserId();
    this.studentService.getStudentSubjects(userId).subscribe({
      next: (res) => {
        this.subjects = res.data;
        this.cdr.detectChanges();
        console.log('Materias matriculadas:', this.subjects);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : 0;
  }
  get totalCredits(): number {
    return this.subjects.length * 3;
  }

  goToSubject(subjectId: number) {
    this.router.navigate(['../subject', subjectId], { relativeTo: this.route });
  }
}
