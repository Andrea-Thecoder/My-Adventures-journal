import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { cards } from '../../../assets/data/tester';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  jornalArray = cards

}
