import { Component, OnInit, Input } from '@angular/core';
import { HistoryOperation } from 'src/model/HistoryOperation';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	@Input()
	historyOperation: HistoryOperation[] = [];

	constructor() {}

	ngOnInit(): void {}
}
