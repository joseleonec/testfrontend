import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimientoService } from '../../../services/movimiento.service';
import { Movimiento } from '../../../models/movimiento.dto';

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

    const movimientoData = this.movimientoForm.value;
    
    // Simulate backend processing
    console.log('Creating movimiento (Simulation):', movimientoData);

    setTimeout(() => {
        const simulatedBalance = 1000 - (movimientoData.tipoMovimiento === 'RETIRO' ? movimientoData.valor : -movimientoData.valor);
        
        this.successMessage = `Movimiento registrado exitosamente. Nuevo saldo disponible: ${simulatedBalance}`;
        this.isSubmitting = false;
        this.movimientoForm.reset({ 
            tipoMovimiento: 'DEPOSITO', 
            valor: 0 
        });
    }, 1000);
  }
}
