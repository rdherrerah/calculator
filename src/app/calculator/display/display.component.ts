import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
	@Input()
	sentence = {
		operation: '0',
		solution: '0'
	};

	constructor() { }

	ngOnInit(): void {
	}

}
