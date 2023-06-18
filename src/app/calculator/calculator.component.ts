import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HistoryOperation } from 'src/model/HistoryOperation';

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
	historyOfSolution: HistoryOperation[] = [];

	constructor() {}

	ngOnInit(): void {}

	setSentenceOperation(sentence: string): void {
		this.sentence.operation = sentence;
	}

	setSentenceSolution(solution: string): void {
		this.sentence.solution = solution;
	}

	addOperation(historyOperation: HistoryOperation): void {
		this.historyOfSolution.push(historyOperation);
	}
}
