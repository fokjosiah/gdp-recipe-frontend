import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  @Input({ required:true }) recipes?: Recipe[];
  @Output() favoriteClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<string>();

  onFavoriteClicked(id: string) {
    //toggle the favorite value of the given recipe by id
    this.favoriteClicked.emit(id);
  }

  onEditClicked(id: string) {
    this.editClicked.emit(id);
  }
}
