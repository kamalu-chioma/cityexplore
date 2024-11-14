import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton
  ],
  template: `
    <form
      [formGroup]="form"
      (submit)="search.emit(form.getRawValue())"
    >
      <mat-form-field style="width: 100%; margin: 10px 0px">
        <mat-label>City</mat-label>
        <input
          formControlName="city"
          matInput placeholder="Search city"
        >
      </mat-form-field>

      <mat-form-field style="width: 100%; margin: 10px 0px">
        <mat-label>Activity Description</mat-label>
        <input
          formControlName="description"
          matInput placeholder="Add a description"
        >
      </mat-form-field>

      <button mat-stroked-button [disabled]="form.invalid">Search</button>
    </form>

  `,
})
export class FormSearchComponent {
  fb = inject(FormBuilder)

  form = this.fb.nonNullable.group({
    city: ['', Validators.required],
    description: [''],
  })

  search = output<{ city: string, description: string }>()
}
