import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';
import { Operation } from 'src/model/Operation';

describe('KeyboardComponent', () => {
	let component: KeyboardComponent;
	let fixture: ComponentFixture<KeyboardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [KeyboardComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(KeyboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('call insertKey', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		});
		it('press key 1 when initialize component', () => {
			const key = '1';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('1');
		});
		it('press key 0 when initialize component', () => {
			const key = '0';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key 1 when exist sentence like 0', () => {
			component.operation = new Operation();
			const key = '1';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('1');
		});
		it('press key 0 when exist sentence like 0', () => {
			component.operation = new Operation('0');
			const key = '0';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key 1 when exist sentence like 23', () => {
			component.operation = new Operation('23');
			const key = '1';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('231');
		});
		it('press key 2 when exist sentence with operator 32 * 0', () => {
			component.operation = new Operation('32', '*');
			const key = '2';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('32 * 2');
		});
		it('press key 2 when exist sentence with operator 32 * 1.2', () => {
			component.operation = new Operation('32', '*', '1.2');
			const key = '2';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('32 * 1.220000');
		});
		describe('And Key is an operator', () => {
			beforeEach(() => {
				fixture = TestBed.createComponent(KeyboardComponent);
				component = fixture.componentInstance;
			});
			it('press key + when exist sentence like 23', () => {
				component.operation = new Operation('23');
				const key = '+';
				component.insertKey(key);
				let sentence = component.sentence;
				expect(sentence).toBe('23 + 0');
			});
			it('press key - when exist sentence like 23', () => {
				component.operation = new Operation('23');
				const key = '-';
				component.insertKey(key);
				let sentence = component.sentence;
				expect(sentence).toBe('23 - 0');
			});
			it('press key * when exist sentence like 23', () => {
				component.operation = new Operation('23');
				const key = '*';
				component.insertKey(key);
				let sentence = component.sentence;
				expect(sentence).toBe('23 * 0');
			});
			it('press key / when exist sentence like 23', () => {
				component.operation = new Operation('23');
				const key = '/';
				component.insertKey(key);
				let sentence = component.sentence;
				expect(sentence).toBe('23 / 0');
			});
		});
	});

	describe('call negative symbol', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		});
		it('press key (-) when exist sentence like 0', () => {
			component.operation = new Operation('0');
			component.negativeNumber();
			let sentence = component.sentence;
			expect(sentence).toBe('-0');
		});
		it('press key (-) when exist sentence like -0', () => {
			component.operation = new Operation();
			component.negativeNumber();
			const key = '2';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('-2');
		});
		it('press key (-) when exist sentence like 32', () => {
			component.operation = new Operation('32');
			component.negativeNumber();
			let sentence = component.sentence;
			expect(sentence).toBe('-32');
		});
		it('press key (-) when exist sentence with operator 32 * 0', () => {
			component.operation = new Operation('32', '*');
			component.negativeNumber();
			let sentence = component.sentence;
			expect(sentence).toBe('32 * -0');
		});
	});

	describe('call point symbol', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		});
		it('press key . when exist sentence like 0', () => {
			component.operation = new Operation('0');
			component.pointNumber();
			let sentence = component.sentence;
			expect(sentence).toBe('0.0');
		});
		it('press key . when exist sentence like 32', () => {
			component.operation = new Operation('32');
			component.pointNumber();
			let sentence = component.sentence;
			expect(sentence).toBe('32.0');
		});
		it('press key . when exist sentence like 32 + 2', () => {
			component.operation = new Operation('32', '+', '2');
			component.pointNumber();
			let sentence = component.sentence;
			expect(sentence).toBe('32 + 2.0');
		});
	});

	describe('call delteKey', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		});
		it('press key <= when exist sentence with more than two chars 34', () => {
			component.operation = new Operation('34');
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3');
		});
		it('press key <= when exist sentence with less than two chars 3', () => {
			component.operation = new Operation('3');
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key <= when exist sentence char 0', () => {
			component.operation = new Operation('0');
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key <= when exist sentence operator 3 +', () => {
			component.operation = new Operation('3','+');
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3');
		});
		it('press key <= when exist sentence 3 + 2', () => {
			component.operation = new Operation('3', '+','2');
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3 + 0');
		});
		it('press key <= when exist sentence 35.5', () => {
			component.operation = new Operation('35.5');
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('35.0');
		});
		it('press key <= when exist sentence 3.0', () => {
			component.operation = new Operation('3');
			component.pointNumber();
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3');
		});
		it('press key <= when exist sentence 3.200000 + 6.0', () => {
			component.operation = new Operation('3.2','+','6');
			component.pointNumber();
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3.200000 + 6');
		});
		it('press key <= when exist sentence 3.200000 + 6.4', () => {
			component.operation = new Operation('3.2', '+', '6.4');
			component.pointNumber();
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3.200000 + 6.0');
		});
	});

	describe('call delete sentence', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		})
		it('press CE when exist sentence with 3.2 - 4.5', () => {
			component.operation = new Operation('3.2', '+','4.5');
			component.deleteSentence();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press CE when exist sentence with 3.2 - 0', () => {
			component.operation = new Operation('3.2', '-');
			component.deleteSentence();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press CE when exist sentence with 3.2', () => {
			component.operation = new Operation('3.2');
			component.deleteSentence();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
	});
});
