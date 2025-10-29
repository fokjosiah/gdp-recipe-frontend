import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { CreateRecipe, Recipe } from "./recipes.model";

@Injectable({ providedIn: 'root'})
export class RecipesService {
  private HttpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/recipes'


  recipes = signal<Recipe[]>([]);
  favoriteRecipes = computed<Recipe[]>(() => this.recipes()!.filter(r => r.favorite))

  constructor() {
    this.loadRecipes();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.HttpClient.get<Recipe[]>(this.baseUrl);
  }

  loadRecipes() {
    this.getRecipes()
    .pipe(
          map(recipes => recipes.map(recipe => (
            {
              //create new recipe object with the favorite field that the front end needs
              ...recipe,
              favorite: false
            }
          ))),
        )
    .subscribe(r => r ? this.recipes.set(r) : []);
  }

  toggleFavorite(id: string) {
    this.recipes.update(currentRecipes => currentRecipes.map(
        //create a new object with favorite toggled if id matches
        r => r.id === id ? { ...r, favorite: !r.favorite } : r
      )
    )
  }

  addRecipe(recipe: CreateRecipe) {
    const updatedRecipes = this.HttpClient.post<Recipe[]>(this.baseUrl, recipe);
    updatedRecipes.subscribe((updatedRecipeList) => {
      console.log('recipe list returned from backend:', updatedRecipeList);
      return this.recipes.set(updatedRecipeList)})
  }

  deleteRecipe(id: string) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      this.HttpClient.delete<string>(`${this.baseUrl}/:id?id=${id}`).subscribe((returnMsg) => {
        if (returnMsg === `Recipe with id ${id} was deleted.`) {
          this.recipes.set(this.recipes().filter(r => r.id !== id));
          console.log(returnMsg);
        }
        else {
          console.error('Failed to delete recipe:', returnMsg);
        }
      })
    }
  }

  editRecipe(id: string, updatedRecipe: CreateRecipe) {
    const updatedRecipes = this.HttpClient.put<Recipe[]>(`${this.baseUrl}/:id?id=${id}`, updatedRecipe);
    updatedRecipes.subscribe((updatedRecipeList) => this.recipes.set(updatedRecipeList))
  }
}
