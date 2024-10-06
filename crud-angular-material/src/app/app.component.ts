import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule] // Importa CommonModule y RouterModule
})
export class AppComponent {
  title = 'crud-angular-material';
}
