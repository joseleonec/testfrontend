import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteRequest } from '../../../models/cliente.dto';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {
  clienteForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      // Fields present in the template
      nombres: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(4)]],
      estado: [true, Validators.required], // Initialized as boolean true to match checkbox
      
      // Fields not in template (kept optional or with defaults to pass validation/types if needed later)
      clienteId: ['generated-id'], 
      genero: [''],
      edad: [0],
      identificacion: ['']
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.clienteForm.value;
    
    // Map form values to DTO
    const clienteData: any = {
      ...formValue,
      nombre: formValue.nombres, // Map nombres to nombre
      estado: formValue.estado, // Keep boolean
      // Defaults for missing fields
      identificacion: formValue.identificacion || '9999999999',
      edad: formValue.edad || 30,
      genero: formValue.genero || 'Otro',
      // Service will assign ID
    };

    console.log('Sending data:', clienteData);

    this.clienteService.create(clienteData).subscribe({
      next: () => {
         console.log('Cliente created successfully');
         this.isSubmitting = false;
         alert('Cliente creado exitosamente');
         this.router.navigate(['/clientes']); 
      },
      error: (error) => {
        console.error('Error creating cliente:', error);
        this.errorMessage = 'Error al crear el cliente.';
        this.isSubmitting = false;
      }
    });
  }
}
