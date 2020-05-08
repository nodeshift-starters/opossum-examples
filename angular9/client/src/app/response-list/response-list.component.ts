import { Component, OnInit } from '@angular/core';
import { ResponseCardComponent } from '../response-card/response-card.component';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss'],
})
export class ResponseListComponent implements OnInit {
  cards = [];

  constructor() {}

  ngOnInit(): void {}

  addResponse(response: any) {
    if (!response) return;
    if (response['data'] === undefined) {
      response['data'] = '';
    }
    this.cards.push(response);
  }

  clearList() {
    this.cards = [];
  }
}
