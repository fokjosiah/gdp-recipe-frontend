import { Component, computed, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { Recipe, RecipeDifficulty } from '../recipes/recipes.model';
import { FormsModule } from '@angular/forms'
import { RecipesService } from '../recipes/recipes.service';
import { CreateRecipe } from '../recipes/recipes.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class NewRecipeComponent {
  private recipeService = inject(RecipesService);
  @Output() close = new EventEmitter<void>();
  @Input({ required: true}) mode: "create" | "edit" = "create";
  @Input() recipe: Recipe | null = null;

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

  ngOnInit() {
    if (this.mode === 'edit') {
      this.recipeName.set(this.recipe?.name ?? '');
      this.recipeDifficulty.set(this.recipe?.difficulty ?? 'easy');
      this.recipeIngredients.set(this.recipe?.ingredients.join(', ') ?? '');
      this.recipeInstructions.set(this.recipe?.instructions ?? '');
      this.recipePrepTime.set(this.recipe?.prep_time_mins ?? 0);
    }
  }

  onSubmitForm() {
    if (this.mode === 'create') {
      const newRecipe: CreateRecipe = {
        name: this.recipeName(),
        difficulty: this.recipeDifficulty(),
        ingredients: this.recipeIngredients().split(",").map(item => item.trim()),
        instructions: this.recipeInstructions(),
        prep_time_mins: this.recipePrepTime(),
        favorite: false,
      }
      this.recipeService.addRecipe(newRecipe);
      this.close.emit();
    }
    else if (this.mode === 'edit' && this.recipe) {
      const updatedRecipe: Recipe = {
        id: this.recipe.id,
        favorite: this.recipe.favorite,
        name: this.recipeName(),
        difficulty: this.recipeDifficulty(),
        ingredients: this.recipeIngredients().split(",").map(item => item.trim()),
        instructions: this.recipeInstructions(),
        prep_time_mins: this.recipePrepTime(),
      }
      this.recipeService.editRecipe(this.recipe.id, updatedRecipe);
      this.close.emit();
    }

  }

  onCancel() {
    this.close.emit();
  }
}
