import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  sentence = "";

  constructor() { }

  ngOnInit(): void {
  }

  setSentence(sentence: string): void {
    this.sentence = sentence;
  }

}
