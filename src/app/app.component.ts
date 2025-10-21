import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipesService } from './recipes/recipes.service';
import { Recipe } from './recipes/recipes.model';
import { map } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, RecipesComponent]
})
export class AppComponent {
  private recipeService = inject(RecipesService);
  recipes = this.recipeService.recipes;
  favoriteRecipes = this.recipeService.favoriteRecipes;
  toggleFavoriteRecipe = this.recipeService.toggleFavorite;
  currentPage:WritableSignal<string> = signal('');
}
