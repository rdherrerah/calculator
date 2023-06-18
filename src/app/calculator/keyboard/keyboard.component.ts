import {
	Component,
	EventEmitter,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import { Operation } from 'src/model/Operation';
import { Keys } from 'src/model/constant/Keys';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
	@Output()
	sentenceEmiter = new EventEmitter<string>();
	@Output()
	sentenceSolutionEmiter = new EventEmitter<string>();
	sentence: string = '';
	sentenceSolution: string = '';
	operation = new Operation();

	constructor() {}

	ngOnInit(): void {}

	insertKey(key: string): void {
		this.operation.insertValue(key);
		this.sentence = this.operation.toString();
		this.sentenceEmiter.emit(this.sentence);
	}

	deleteSentence(): void {
		this.operation = new Operation();
		this.sentence = this.operation.toString();
		this.sentenceEmiter.emit(this.sentence);
	}

	deleteKey(): void {
		this.operation.deleteLastValue();
		this.sentence = this.operation.toString();
		console.log(this.operation);
		this.sentenceEmiter.emit(this.sentence);
	}

	negativeNumber(): void {
		this.operation.insertValue(Keys.SYMBOL_NUMBER.NEGATIVE);
		this.sentence = this.operation.toString();
		this.sentenceEmiter.emit(this.sentence);
	}

	pointNumber(): void {
		this.operation.insertValue(Keys.SYMBOL_NUMBER.POINT);
		this.sentence = this.operation.toString();
		this.sentenceEmiter.emit(this.sentence);
	}

	result(): void {
		this.sentenceSolution = this.operation.getSolution().toString();
		this.sentenceSolutionEmiter.emit(this.sentenceSolution);
	}

	temp(): void {}
}
