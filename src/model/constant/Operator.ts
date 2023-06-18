import * as math from 'mathjs';

export class Operator {
	static readonly PLUS = {
		symbol: '+',
		solve: (num1: math.BigNumber, num2: math.BigNumber) => num1.plus(num2)
	};
	static readonly MINUS = {
		symbol: '-',
		solve: (num1: math.BigNumber, num2: math.BigNumber) => num1.minus(num2)
	};
	static readonly MULTIPLY = {
		symbol: '*',
		solve: (num1: math.BigNumber, num2: math.BigNumber) => num1.times(num2)
	};
	static readonly DIVIDE = {
		symbol: '/',
		solve: (num1: math.BigNumber, num2: math.BigNumber) =>
			num1.dividedBy(num2)
	};
}
