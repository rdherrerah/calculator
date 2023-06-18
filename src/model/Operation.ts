import {
	BigNumber,
	bignumber,
	boolean,
	compare,
	equal,
	mod} from 'mathjs';
import { Keys } from './constant/Keys';
import { Operator } from './constant/Operator';

export class Operation {
	firstNumber: BigNumber = bignumber('0');
	isFirstNumberNegative: boolean = false;
	hasDecimalFirstNumber: boolean = false;
	secondNumber: BigNumber = bignumber('0');
	isSecondNumberNegative: boolean = false;
	hasDecimalSecondNumber: boolean = false;
	operator: string = '';
	solution: BigNumber = bignumber('0');

	constructor(
		firstNumber: string = '0',
		operator: string = '',
		secondNumber: string = '0'
	) {
		if (!equal(firstNumber, 0)) {
			this.firstNumber = bignumber(firstNumber);
			this.isFirstNumberNegative = compare(firstNumber, 0) == -1;
			this.hasDecimalFirstNumber = !equal(
				mod(bignumber(firstNumber), 1),
				0
			);
		}
		if (!equal(secondNumber, 0)) {
			this.secondNumber = bignumber(secondNumber);
			this.isSecondNumberNegative = compare(secondNumber, 0) == -1;
			this.hasDecimalSecondNumber = !equal(
				mod(bignumber(secondNumber), 1),
				0
			);
		}
		if (operator != '') {
			this.operator = operator;
		}
	}

	insertValue(value: string): void {
		if (Keys.BASIC_NUMBER.includes(value)) {
			this.insertNumber(this.getPositionNumber(), value);
		}
		if (Keys.BASIC_OPERATOR.includes(value)) {
			this.insertOperator(value);
		}
		if (Keys.SYMBOL_NUMBER.NEGATIVE === value) {
			this.convertToNumberNegativeOrPositive();
		}
		if (Keys.SYMBOL_NUMBER.POINT === value) {
			this.convertToDecimalNumber();
		}
	}

	deleteLastValue() {
		if (this.hasOperator()) {
			if (!equal(this.secondNumber, 0)) {
				this.secondNumber = this.deleteNumber('S', this.secondNumber);
			} else {
				this.deleteOperator();
			}
		} else {
			this.firstNumber = this.deleteNumber('F', this.firstNumber);
		}
	}

	insertNumber(type: 'F' | 'S', number: string): void {
		if (type === 'F')
			if (this.hasDecimalFirstNumber)
				this.firstNumber = this.insertDecimalNumber(
					this.firstNumber,
					number
				);
			else
				this.firstNumber = bignumber(
					this.firstNumber.toString().concat(number)
				);
		if (type === 'S')
			if (this.hasDecimalSecondNumber)
				this.secondNumber = this.insertDecimalNumber(
					this.secondNumber,
					number
				);
			else
				this.secondNumber = bignumber(
					this.secondNumber.toString().concat(number)
				);
	}

	deleteNumber(type: 'F' | 'S', number: BigNumber): BigNumber {
		if (
			type === 'F'
				? this.hasDecimalFirstNumber
				: this.hasDecimalSecondNumber
		) {
			return this.deleteDecimalNumber(number);
		} else {
			const n = number.toString();
			if (n.length == 1)
				return bignumber('0');
			else
				return bignumber(
					n.slice(0, n.length - 1)
				);
		}
	}

	insertDecimalNumber(
		number: BigNumber,
		numberToAdd: string
	): BigNumber {
		if (!equal(mod(number, 1), 0))
			return bignumber(
				number
					.toString()
					.split('.')[0]
					.concat('.')
					.concat(number.toString().split('.')[1].concat(numberToAdd))
			);
		else
			return bignumber(
				number.toString().split('.')[0].concat('.').concat(numberToAdd)
			);
	}

	deleteDecimalNumber(number: BigNumber): BigNumber {
		if (!equal(mod(number, 1), 0)) {
			const decimal: string = number.toString().split('.')[1];
			return bignumber(
				number
					.toString()
					.split('.')[0]
					.concat('.')
					.concat(decimal.slice(0, decimal.length - 1))
			);
		} else {
			this.revertFromDecimal();
			return bignumber(number.toString().split('.')[0]);
		}
	}

	convertToNumberNegativeOrPositive(): void {
		if (this.hasOperator())
			this.isSecondNumberNegative = !this.isSecondNumberNegative;
		else this.isFirstNumberNegative = !this.isFirstNumberNegative;
	}

	convertToDecimalNumber(): void {
		if (this.hasOperator()) this.hasDecimalSecondNumber = true;
		else this.hasDecimalFirstNumber = true;
	}

	revertFromDecimal(): void {
		if (this.hasOperator()) this.hasDecimalSecondNumber = false;
		else this.hasDecimalFirstNumber = false;
	}

	insertOperator(operator: string): void {
		this.operator = operator;
	}

	deleteOperator(): void {
		this.operator = '';
	}

	getPositionNumber(): 'F' | 'S' {
		return this.hasOperator() ? 'S' : 'F';
	}

	hasOperator(): boolean {
		return Keys.BASIC_OPERATOR.includes(this.operator);
	}

	getSolution(): BigNumber {
		if (!this.hasOperator()) return this.firstNumber;
		Object.values(Operator).forEach((e:{symbol:string ,solve: Function}) =>{
			if (e.symbol === this.operator){
				this.solution = e.solve(
					this.firstNumber,
					this.secondNumber
				);
			}
		})
		return this.solution;
	}

	toString(): string {
		return (this.isFirstNumberNegative ? '-' : '')
			.concat(this.firstNumber.toString())
			.concat(
				this.hasDecimalFirstNumber &&
					equal(mod(this.firstNumber, 1), 0)
					? '.0'
					: ''
			)
			.concat(
				Keys.BASIC_OPERATOR.includes(this.operator)
					? ' '.concat(this.operator).concat(' ')
					: ''
			)
			.concat(this.isSecondNumberNegative ? '-' : '')
			.concat(
				!equal(this.secondNumber, 0)
					? this.secondNumber.toString()
					: this.hasOperator()
						? '0'
						: ''
			)
			.concat(
				this.hasDecimalSecondNumber &&
					equal(mod(this.secondNumber, 1), 0)
					? '.0'
					: ''
			);
	}
}
