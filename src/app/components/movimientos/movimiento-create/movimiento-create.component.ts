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

    // Logic to handle DEPOSITO vs RETIRO if backend expects positive/negative values or just type.
    // Detailed analysis of Postman: 
    // Create request passes generic body.
    // Response for Retiro: 'valor': -575. Response for Deposito: 'valor': 600.
    // But typically user enters positive number and selects type.
    // The DTO has 'valor'. 
    // If backend determines sign based on type, I send positive.
    // If backend expects signed value in 'valor' regardless of type...
    // Looking at Postman Update Movimiento: 'tipoMovimiento': 'Retiro', 'valor': -100.
    // This suggests 'valor' should be signed matching the operation? 
    // Or maybe the backend logic subtracts if type is Retiro.
    // Let's assume for now I send the signed value if it is a withdrawal? 
    // Or let logic handle it. Usually, APIs take amount and type.
    // Let's look at Postman Create Movimiento Response 2 (Retiro) Body: valor: 300.25 (Positive in response?? No, wait)
    // Wait, Postman response 3: Retiro, valor: -575.
    // Postman response 2: rETIRO (mixed case), valor: 300.25 (positive). saldo: 500.25. 
    // This is confusing. Maybe 'valor' stores the transaction amount (signed).
    // I will implement logic: If Withdraw, make value negative. 
    
    let formValue = this.movimientoForm.value;
    let amount = formValue.valor;
    if (formValue.tipoMovimiento === 'RETIRO') {
       amount = -Math.abs(amount);
    } else {
       amount = Math.abs(amount);
    }

    const movimientoData: Movimiento = {
      ...formValue,
      valor: amount
    };

    this.movimientoService.create(movimientoData).subscribe({
      next: (res) => {
        this.successMessage = `Movimiento realizado exitosamente. Nuevo Saldo: ${res.saldo}`;
        this.isSubmitting = false;
        this.movimientoForm.reset({ 
          tipoMovimiento: 'DEPOSITO', 
          valor: 0 
        });
      },
      error: (error) => {
        console.error('Error creating movimiento:', error);
        this.errorMessage = 'Error al realizar el movimiento. Verifique la Cuenta ID y saldo.';
        this.isSubmitting = false;
      }
    });
  }
}
