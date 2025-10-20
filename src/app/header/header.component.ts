import { Component, Input, Signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [NavbarComponent]
})
export class HeaderComponent {
  @Input({ required: true }) currentPage!: WritableSignal<string>;
}
