import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "./recipes.model";

@Injectable({ providedIn: 'root'})
export class RecipesService {
  private HttpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/recipes'

  getRecipes(): Observable<Recipe[]> {
    return this.HttpClient.get<Recipe[]>(this.baseUrl);
  }
}
