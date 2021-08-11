import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent implements OnInit {
  stats = [];

  constructor() {}

  ngOnInit(): void {}

  update(data) {
    this.stats = Object.keys(data).map(
      key => `${key}: ${JSON.stringify(data[key])}`
    );
  }
}
