import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuenta } from '../../../models/cuenta.dto';
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuenta-create.component.html',
  styleUrls: ['./cuenta-create.component.css']
})
export class CuentaCreateComponent {
  cuentaForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private router: Router
  ) {
    this.cuentaForm = this.fb.group({
      numeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoCuenta: ['Ahorros', Validators.required],
      saldoInicial: [0, [Validators.required, Validators.min(0)]],
      estado: ['True', Validators.required],
      clienteId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] // Assuming clienteId is numeric based on previous context
    });
  }

  onSubmit(): void {
    if (this.cuentaForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const cuentaData: Cuenta = this.cuentaForm.value;

    this.cuentaService.create(cuentaData).subscribe({
      next: (res) => {
        this.successMessage = `Cuenta creada exitosamente.`;
        this.isSubmitting = false;
        alert('Cuenta creada exitosamente');
        this.router.navigate(['/cuentas']);
      },
      error: (error) => {
        console.error('Error creating cuenta:', error);
        this.errorMessage = 'Error al crear la cuenta.';
        this.isSubmitting = false;
      }
    });
  }
}
