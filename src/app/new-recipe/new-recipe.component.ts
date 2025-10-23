import { Component, computed, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { RecipeDifficulty } from '../recipes/recipes.model';
import { FormsModule } from '@angular/forms'
import { RecipesService } from '../recipes/recipes.service';
import { CreateRecipe } from '../recipes/recipes.model';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  private recipeService = inject(RecipesService);
  @Output() close = new EventEmitter<void>();
  recipeName = signal('');
  recipeDifficulty: WritableSignal<RecipeDifficulty> = signal('easy');
  recipeIngredients = signal('');
  recipeInstructions = signal('');
  recipePrepTime = signal(0);

  isFormValid = computed(() => {
    return this.recipeName().trim() !== ''
    && this.recipeIngredients().trim() !== ''
    && this.recipeInstructions().trim() !== ''
  })

  onSubmitForm() {
    const newRecipe: CreateRecipe = {
      name: this.recipeName(),
      difficulty: this.recipeDifficulty(),
      ingredients: this.recipeIngredients().split(",").map(item => item.trim()),
      instructions: this.recipeInstructions(),
      prep_time_mins: this.recipePrepTime()
    }
    this.recipeService.addRecipe(newRecipe);
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
