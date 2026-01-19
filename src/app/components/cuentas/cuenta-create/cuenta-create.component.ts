import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuentaService } from '../../../services/cuenta.service';
import { Cuenta } from '../../../models/cuenta.dto';

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
    private cuentaService: CuentaService
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
    // Map string 'True'/'False' to boolean if backend expects boolean, 
    // but DTO allows string | boolean and Postman showed string 'True'.
    // Keeping it as is from form.

    this.cuentaService.create(cuentaData).subscribe({
      next: (res) => {
        this.successMessage = `Cuenta creada exitosamente con ID: ${res.id}`;
        this.isSubmitting = false;
        this.cuentaForm.reset({ 
          tipoCuenta: 'Ahorros', 
          estado: 'True', 
          saldoInicial: 0 
        });
      },
      error: (error) => {
        console.error('Error creating cuenta:', error);
        this.errorMessage = 'Error al crear la cuenta. Verifique el Cliente ID y intente nuevamente.';
        this.isSubmitting = false;
      }
    });
  }
}
