import { bignumber } from 'mathjs';
import { Operation } from './Operation';

describe('Operation class', () => {
	let operation: Operation;
	it('should create an instance', () => {
		expect(new Operation()).toBeTruthy();
	});

	beforeEach(() => {
		operation = new Operation();
	});

	describe('should insertValue', () => {
		it('as number', () => {
			const number = '1';
			operation.insertValue(number);
			expect(operation.firstNumber).toEqual(bignumber('1'));
		});
		it('as operator', () => {
			const operator = '+';
			operation.firstNumber = bignumber('2');
			operation.insertValue(operator);
			expect(operation.operator).toEqual('+');
		});
		it('as second number', () => {
			const number = '1';
			operation.firstNumber = bignumber('2');
			operation.operator = '+';
			operation.insertValue(number);
			expect(operation.secondNumber).toEqual(bignumber(1));
		});
	});
	describe('should deleteLastValue', () => {
		it('as number', () => {
			operation.firstNumber = bignumber('32');
			operation.deleteLastValue();
			expect(operation.firstNumber).toEqual(bignumber(3));
		});
		it('as operator', () => {
			operation.firstNumber = bignumber('2');
			operation.operator = '+';
			operation.deleteLastValue();
			expect(operation.operator).toEqual('');
			expect(operation.firstNumber).toEqual(bignumber('2'));
		});
		it('as second number', () => {
			operation.firstNumber = bignumber('2');
			operation.operator = '+';
			operation.secondNumber = bignumber('41');
			operation.deleteLastValue();
			expect(operation.firstNumber).toEqual(bignumber('2'));
			expect(operation.operator).toEqual('+');
			expect(operation.secondNumber).toEqual(bignumber('4'));
		});
	});
	describe('should insert number position', () => {
		it('as first number', () => {
			const number = '4';
			operation.firstNumber = bignumber('9');
			operation.insertNumber('F', number);
			expect(operation.firstNumber).toEqual(bignumber('94'));
		});
		it('as second number', () => {
			const number = '9';
			operation.secondNumber = bignumber('10');
			operation.insertNumber('S', number);
			expect(operation.secondNumber).toEqual(bignumber('109'));
		});
	});
	describe('should delete number position', () => {
		it('as first number', () => {
			operation.firstNumber = bignumber('94');
			expect(operation.deleteNumber('F', operation.firstNumber)).toEqual(
				bignumber('9')
			);
		});
		it('as second number', () => {
			operation.secondNumber = bignumber('9.4');
			operation.hasDecimalSecondNumber = true;
			expect(operation.deleteNumber('S', operation.secondNumber)).toEqual(
				bignumber('9')
			);
		});
	});
	describe('should insert decimal number', () => {
		it('as first number', () => {
			const number = '5';
			operation.firstNumber = bignumber('94');
			operation.convertToDecimalNumber();
			expect(
				operation.insertDecimalNumber(operation.firstNumber, number)
			).toEqual(bignumber('94.5'));
			expect(operation.hasDecimalFirstNumber).toEqual(true);
		});
		it('as second number', () => {
			const number = '5';
			operation.secondNumber = bignumber('9.5');
			operation.hasDecimalSecondNumber = true;
			expect(
				operation.insertDecimalNumber(operation.secondNumber, number)
			).toEqual(bignumber('9.55'));
			expect(operation.hasDecimalSecondNumber).toEqual(true);
		});
	});
	describe('should delete decimal number', () => {
		it('as first number', () => {
			operation.firstNumber = bignumber('94.5');
			operation.hasDecimalSecondNumber = true;
			expect(
				operation.deleteDecimalNumber(operation.firstNumber)
			).toEqual(bignumber('94'));
			expect(operation.hasDecimalFirstNumber).toEqual(false);
		});
		it('as second number', () => {
			operation.secondNumber = bignumber('9.55');
			operation.hasDecimalSecondNumber = true;
			expect(
				operation.deleteDecimalNumber(operation.secondNumber)
			).toEqual(bignumber('9.5'));
			expect(operation.hasDecimalSecondNumber).toEqual(true);
		});
	});
});
