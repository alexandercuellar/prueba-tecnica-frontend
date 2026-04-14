import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../../Core/services/student.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Toast } from '../../../shared/components/toast/toast';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-update.student',
  imports: [CommonModule, ReactiveFormsModule, Toast],
  standalone: true,
  templateUrl: './update.student.html',
  styleUrl: './update.student.css',
})
export class UpdateStudentComponent implements OnInit {
  @ViewChild(Toast) toast!: Toast;
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private cdr = inject(ChangeDetectorRef);

  userId: number = 0;

  form = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]]
  });

  ngOnInit(): void {
    this.userId = this.getUserId();
    this.loadUserData();
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : 0;
  }

  loadUserData() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);

      this.form.patchValue({
        email: parsed.email,
        phone: ''
      });
    }

    this.cdr.detectChanges();
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      id: this.userId,
      phone: this.form.value.phone,
      email: this.form.value.email,
      password: this.form.value.password || ''
    };

    this.studentService.updateStudentContact(this.userId, payload).subscribe({
      next: () => {
        this.toast.show(
          'Actualización exitosa',
          'Datos actualizados',
          'success'
        );

        setTimeout(() => {
          this.toast.close();
        }, 2000);
      },
      error: (err) => {
        this.toast.show(
          'Error',
          'No se pudo actualizar el usuario',
          'error'
        );
      }
    });
  }

  onlyNumbers(event: any) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    this.form.get('phone')?.setValue(value, { emitEvent: false });
  }
}
