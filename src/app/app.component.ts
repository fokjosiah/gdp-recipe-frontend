import { asNativeElements, Component, computed, inject, signal, WritableSignal } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipesService } from './recipes/recipes.service';
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, RecipesComponent, NewRecipeComponent]
})
export class AppComponent {
  private recipeService = inject(RecipesService);
  isCreatingRecipe = false;
  recipes = this.recipeService.recipes;
  favoriteRecipes = this.recipeService.favoriteRecipes;
  toggleFavoriteRecipe = this.recipeService.toggleFavorite;
  currentPage:WritableSignal<string> = signal('');

  onCloseCreateRecipe() {
    this.isCreatingRecipe = false;
  }

  onOpenCreateRecipe() {
    this.isCreatingRecipe = true;
  }
}
