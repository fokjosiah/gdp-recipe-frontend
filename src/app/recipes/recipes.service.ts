import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { Recipe } from "./recipes.model";

@Injectable({ providedIn: 'root'})
export class RecipesService {
  private HttpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/recipes'

  getRecipes(): Observable<Recipe[]> {
    return this.HttpClient.get<Recipe[]>(this.baseUrl);
  }
}
