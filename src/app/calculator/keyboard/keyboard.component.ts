import * as moment from 'moment';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HistoryOperation } from 'src/model/HistoryOperation';
import { Operation } from 'src/model/Operation';
import { Keys } from 'src/model/constant/Keys';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
	@Output()
	sentenceEmitter = new EventEmitter<string>();
	@Output()
	sentenceSolutionEmitter = new EventEmitter<string>();
	@Output()
	operationToSaveEmitter = new EventEmitter<HistoryOperation>();
	sentence: string = '';
	sentenceSolution: string = '';
	operation = new Operation();

	constructor() {}

	ngOnInit(): void {}

	insertKey(key: string): void {
		if (
			!(Keys.BASIC_OPERATOR.includes(key) && this.operation.hasOperator())
		) {
			this.operation.insertValue(key);
			this.updateSentence();
		} else {
			this.resultOperator(key);
		}
	}

	deleteSentence(): void {
		this.operation = new Operation();
		this.updateSentence();
	}

	deleteKey(): void {
		this.operation.deleteLastValue();
		this.updateSentence();
	}

	negativeNumber(): void {
		this.operation.insertValue(Keys.SYMBOL_NUMBER.NEGATIVE);
		this.updateSentence();
	}

	pointNumber(): void {
		this.operation.insertValue(Keys.SYMBOL_NUMBER.POINT);
		this.updateSentence();
	}

	result(): void {
		this.sentenceSolution = this.operation.getSolution().toString();
		this.operationToSaveEmitter.emit(
			new HistoryOperation(
				this.operation,
				this.sentenceSolution,
				moment()
			)
		);
		this.sentenceSolutionEmitter.emit(this.sentenceSolution);
		this.operation = new Operation(this.sentenceSolution);
		this.updateSentence();
	}

	resultOperator(newOperator: string): void {
		this.result();
		this.operation.operator = newOperator;
		this.updateSentence();
	}

	updateSentence(): void {
		this.sentence = this.operation.toString();
		this.sentenceEmitter.emit(this.sentence);
	}

	temp(): void {}
}
