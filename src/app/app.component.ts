import { Component, computed, inject, signal, WritableSignal, Signal } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipesService } from './recipes/recipes.service';
import { NewRecipeComponent } from "./recipe-form/recipe-form.component";
import { Recipe } from './recipes/recipes.model';

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
  isEditingRecipe = false;
  recipes = this.recipeService.recipes;
  favoriteRecipes = this.recipeService.favoriteRecipes;
  toggleFavoriteRecipe = this.recipeService.toggleFavorite;
  currentPage:WritableSignal<string> = signal('');
  editingRecipeId: WritableSignal<string | null> = signal(null);
  editingRecipe: Signal<Recipe | null> = computed(() => this.recipes().find(recipe => recipe.id === this.editingRecipeId()) || null);

  onCloseCreateRecipe() {
    this.isCreatingRecipe = false;
  }

  onOpenCreateRecipe() {
    this.isCreatingRecipe = true;
  }

  onOpenEditRecipe(id: string) {
    this.isEditingRecipe = true;
    this.editingRecipeId.set(id);
  }

  onCloseEditRecipe() {
    this.isEditingRecipe = false;
  }
}
