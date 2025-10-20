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
export class AppComponent implements OnInit{
  private recipeService = inject(RecipesService);
  recipes!: Recipe[];
  favoriteRecipes!: Recipe[];
  currentPage:WritableSignal<string> = signal('');

  ngOnInit() {
    this.recipeService.getRecipes()
    .pipe(
      map(recipes => recipes.map(recipe => (
        {
          //create new recipe object with the favorite field that the front end needs
          ...recipe,
          favorite: false
        }
      )))
    )
    .subscribe({
      next: (data) => {
        this.recipes = data;
        this.favoriteRecipes = this.recipes.filter(r => r.favorite);
      },
      error: (err) => console.log(err),
    })
  }

  toggleFavoriteRecipe(id: string) {
    this.recipes = this.recipes.map(r => r.id === id ? {...r, favorite: !r.favorite} : r);
    const favoriteExists = this.favoriteRecipes.some(r => r.id === id);
    if (favoriteExists) {
      //if it already exists then we need to remove it
      this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== id);
    }
    else {
      //if not already a favorite then add to favorites
      const newFavorite = this.recipes.find(r => r.id === id);
      this.favoriteRecipes.push(newFavorite!);
    }
  }
}
