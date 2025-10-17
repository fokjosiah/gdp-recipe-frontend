import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from "./recipes/recipes.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, RecipesComponent]
})
export class AppComponent {

}
