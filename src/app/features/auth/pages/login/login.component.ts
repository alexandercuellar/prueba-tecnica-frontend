import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../Core/services/Auth.Service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Toast } from '../../../../shared/components/toast/toast';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule,CommonModule,Toast],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  @ViewChild(Toast) toast!: Toast;

  form!: FormGroup;
    constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
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

  const request = this.form.value;

  this.authService.login(request).subscribe({
    next: (res: any) => {

      this.authService.saveSession(res);
        this.toast.show(
        'Bienvenido',
        'Inicio de sesión exitoso',
        'success'
      );
       setTimeout(() => {
        this.router.navigate(['/dashboard/student']);
      }, 2000);

    },
    error: (err: any) => {
        this.toast.show(
        'Error de autenticación',
        'Error en el login, por favor verifica tus credenciales',
        'error'
      );
    }
  });
}
}
