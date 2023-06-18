import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
	sentence = {
		operation: '0',
		solution: '0'
	};

	constructor() {}

	ngOnInit(): void {}

	setSentenceOperation(sentence: string): void {
		this.sentence.operation = sentence;
	}

	setSentenceSolution(solution: string): void {
		this.sentence.solution = solution;
	}
}
