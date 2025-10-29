import { Component, EventEmitter, Input, Output, Signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input({ required: true }) currentPage!: WritableSignal<string>;
  @Output() openCreateRecipe = new EventEmitter<void>();

  onClickRecipe() {
    //update the currently showing page to recipes
    this.currentPage.set("recipes");
  }
  onClickFavorite() {
    this.currentPage.set("favorites")
  }
  onClickCreate() {
    this.openCreateRecipe.emit();
  }
}
