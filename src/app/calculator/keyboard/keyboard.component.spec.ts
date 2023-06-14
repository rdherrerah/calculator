import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';

describe('KeyboardComponent', () => {
	let component: KeyboardComponent;
	let fixture: ComponentFixture<KeyboardComponent>;

	beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ KeyboardComponent ]
	})
	.compileComponents();

	fixture = TestBed.createComponent(KeyboardComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('call insertKey', () => {
		beforeEach(()=>{
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		})
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
			component.sentence='0';
			const key = '1';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('1');
		});
		it('press key 0 when exist sentence like 0', () => {
			component.sentence='0';
			const key = '0';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key 1 when exist sentence like 23', () => {
			component.sentence='23';
			const key = '1';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('231');
		});
		it('press key + when exist sentence like 23', () => {
			component.sentence='23';
			const key = '+';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('23 + ');
		});
		it('press key . when exist sentence like 32', () => {
			component.sentence='32';
			const key = '.';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('32.');
		});
		it('press key - when exist sentence like 0', () => {
			component.sentence='0';
			const key = '-';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('-0');
		});
		it('press key - when exist sentence like 32', () => {
			component.sentence='32';
			const key = '-';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('32 - ');
		});
		it('press key - when exist sentence with operator 32 * ', () => {
			component.sentence='32 * ';
			const key = '-';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('32 * -');
		});
		it('press key 2 when exist sentence with operator 32 * ', () => {
			component.sentence='32 * ';
			const key = '2';
			component.insertKey(key);
			let sentence = component.sentence;
			expect(sentence).toBe('32 * 2');
		});
	});
	describe('call delteKey', () => {
		beforeEach(()=>{
			fixture = TestBed.createComponent(KeyboardComponent);
			component = fixture.componentInstance;
		})
		it('press key <= when exist sentence with more than two chars 34', () => {
			component.sentence = '34';
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3');
		});
		it('press key <= when exist sentence with less than two chars 3', () => {
			component.sentence = '3';
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key <= when exist sentence char 0', () => {
			component.sentence='0';
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('0');
		});
		it('press key <= when exist sentence operator +', () => {
			component.sentence='3 + ';
			component.deleteKey();
			let sentence = component.sentence;
			expect(sentence).toBe('3');
		})
	});
});
