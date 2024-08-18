import { Component, Input  } from '@angular/core';
import { EditButtonComponent } from '../edit-button/edit-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [EditButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() journalObj = {id:0,title:"",game:"",gameImg:""};

}
