import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Output() favoriteClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<string>();
  private recipeService = inject(RecipesService);

  toggleFavorite() {
    this.favoriteClicked.emit(this.recipe.id);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
  }

  onEditRecipe() {
    this.editClicked.emit(this.recipe.id);
  }

}
