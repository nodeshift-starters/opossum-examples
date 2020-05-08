import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss'],
})
export class ResponseCardComponent implements OnInit {
  @Input() card: any;

  constructor() {}

  ngOnInit(): void {}
}
