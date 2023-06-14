import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
	@Output()
	sentenceEmiter = new EventEmitter<string>();
	sentence: string = '0';
	operators = ['+', '-', '*', '/']

	constructor() { }

	ngOnInit(): void {
	}

	insertKey(key: string): void {
		console.log(key);
		// validate initialize
		if(this.sentence !== '0'){
			// validate operator
			if(this.operators.includes(key)){
				if(key === '-' && this._isNewNumber(this.sentence))
					this.sentence = this.sentence.concat(key);
				else
					this.sentence = this.sentence.concat(' '.concat(key.concat(' ')));
			} else 
				this.sentence = this.sentence.concat(key);
		}
		if(this.sentence === '0')
			// validate operator
			if(this.operators.includes(key))
				if(key === '-')
					this.sentence = '-0';
				else
					this.sentence === this.sentence.concat(' '.concat(key.concat(' ')));
			else
				this.sentence = key
		this.sentenceEmiter.emit(this.sentence);
	}

	deleteKey(): void {
		if (
			this.sentence.length === 1 
			|| (this.sentence.length === 2 && this.sentence.substring(1,1) === '-')
		)
			this.sentence = '0';
		if(this.sentence.length > 1){
			if(this.operators.includes(this.sentence.substring(this.sentence.length-3).trim()))
				this.sentence = this.sentence.slice(0,-3);
			else
				this.sentence = this.sentence.slice(0,-1);
		}
		this.sentenceEmiter.emit(this.sentence);
	}

	private _isNewNumber(text: string): boolean{
		if(text.substring(text.length-3)[0] === ' ' && text.substring(text.length-3)[2] === ' ')
			return true;
		return false;
	}

}
