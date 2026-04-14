import { Component } from '@angular/core';
import { FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../Core/services/Auth.Service';
import { Router } from '@angular/router';
import { StudentRequest } from '../../../../shared/models/student-request.model';
import { RouterModule } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Toast } from '../../../../shared/components/toast/toast';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule,Toast],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
@ViewChild(Toast) toast!: Toast;

  form: any;

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      secondName: [''],
      firstLastName: ['', Validators.required],
      secondLastName: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isInvalid(field: string): boolean {
  const control = this.form.get(field);
  return !!(control && control.invalid && control.touched);
  }

  submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.value;

  const request: StudentRequest = {
    ...formValue,
    birthDate: new Date(formValue.birthDate).toISOString(),
    programId: 1
  };

  this.authService.register(request).subscribe({
    next: () => {
      this.toast.show(
        'Registro exitoso',
        'El usuario fue registrado correctamente',
        'success'
      );


      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();

       setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    },
    error: (err: any) => {
      console.error('error registro', err);
      this.toast.show(
        'Error',
        'No se pudo registrar el usuario',
        'error'
      );
      // this.errorMessage = 'Error al registrar usuario';
      // this.message = '';
    }
  });
}
}
