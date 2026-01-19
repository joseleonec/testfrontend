import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movimiento } from '../../../models/movimiento.dto';
import { MovimientoService } from '../../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimiento-create.component.html',
  styleUrls: ['./movimiento-create.component.css']
})
export class MovimientoCreateComponent {
  movimientoForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService
  ) {
    this.movimientoForm = this.fb.group({
      cuentaId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoMovimiento: ['DEPOSITO', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.movimientoForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const movimientoData: Movimiento = this.movimientoForm.value;
    
    // Set positive/negative based on type if needed, or leave as absolute value depending on backend logic.
    // Assuming backend logic (here in-memory service) handles it or we pass it as is.
    // Previous simulation logic:
    // const simulatedBalance = 1000 - (movimientoData.tipoMovimiento === 'RETIRO' ? movimientoData.valor : -movimientoData.valor);
    
    this.movimientoService.create(movimientoData).subscribe({
      next: (res) => {
        this.successMessage = `Movimiento registrado exitosamente. (ID: ${res.id})`;
        this.isSubmitting = false;
        this.movimientoForm.reset({ 
            tipoMovimiento: 'DEPOSITO', 
            valor: 0 
        });
      },
      error: (error) => {
        console.error('Error creating movimiento:', error);
        this.errorMessage = 'Error al realizar el movimiento.';
        this.isSubmitting = false;
      }
    });
  }
}
