import { Component ,inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../Core/services/student.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-subjectinfo-director',
  imports: [CommonModule],
  templateUrl: './subjectinfo-director.html',
  styleUrl: './subjectinfo-director.css',
})
export class SubjectinfoDirectorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  private cdr = inject(ChangeDetectorRef);
  subjectId: number = 0;
  classmates: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.subjectId = Number(params.get('id'));
      this.loadClassmates();
    });
  }

  loadClassmates() {
    this.studentService.getClassmates(this.subjectId).subscribe({
      next: (res) => {
        this.classmates = [...res.data];
        this.cdr.detectChanges();
      },
      error: (err) => {
      }
    });
  }
}
