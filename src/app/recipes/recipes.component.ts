import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{
  private recipesService = inject(RecipesService);

  recipes: Recipe[] = [];

  ngOnInit() {
    this.recipesService.getRecipes()
    .subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => console.log(err),
    })
  }
}
