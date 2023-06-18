import { BigNumber, bignumber } from 'mathjs';
import { Operation } from './Operation';
import * as moment from 'moment';

export class HistoryOperation {
	operation: Operation = new Operation();
	solution: string = '';
	date: moment.Moment = moment();

	constructor(
		operation: Operation = new Operation('0'),
		solution: string,
		date: moment.Moment
	) {
		this.operation = operation;
		this.solution = solution;
		this.date = date;
	}
}
