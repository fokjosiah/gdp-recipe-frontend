import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  @Output() close = new EventEmitter<void>();

  onCancel() {
    this.close.emit();
  }
}
