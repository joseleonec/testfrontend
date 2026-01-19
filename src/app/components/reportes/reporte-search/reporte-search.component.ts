import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte-search.component.html',
  styleUrls: ['./reporte-search.component.css']
})
export class ReporteSearchComponent {
  @Output() search = new EventEmitter<{fechaInicio: string, fechaFin: string, clienteId: string}>();
  
  reporteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reporteForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      clienteId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reporteForm.valid) {
      this.search.emit(this.reporteForm.value);
    }
  }
}
