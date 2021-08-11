import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import axios from 'axios';
import opossum from 'opossum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Output() onServiceResponse = new EventEmitter<object>();
  @Output() onClearList = new EventEmitter<any>();
  @Output() onSnapshot = new EventEmitter<any>();

  route = 'http://localhost:3000/flakeyService';
  circuitBreakerOptions = {
    timeout: 500,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
  };
  circuit = new opossum(
    () => axios.get(this.route),
    this.circuitBreakerOptions
  );

  ngOnInit(): void {
    this.circuit.fallback(() => {
      return {
        data: {
          body: `${this.route} unavailable right now. Try later.`,
        },
      };
    });

    this.circuit.status.on('snapshot', data => this.onSnapshot.emit(data));

    [
      'success',
      'timeout',
      'reject',
      'open',
      'halfOpen',
      'close',
      'fallback',
    ].every(event =>
      this.circuit.on(event, payload =>
        this.onServiceResponse.emit({
          event,
          data: payload ? JSON.stringify(payload.data) : '',
        })
      )
    );
  }

  callService() {
    this.circuit.fire();
  }

  clearList() {
    this.onClearList.emit(true);
  }
}
