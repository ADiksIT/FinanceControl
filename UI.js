import { isValidation, listElement } from "./utils.js";
class UI {
	constructor(){
	    this.listItems = document.querySelector('.list-items');
		this.submit = document.querySelector('.submit');
		this.addBalans = document.querySelector('.add-balans');
		this.totalBalanse = document.querySelector('.total-balanse');
		this.totalMinus = document.querySelector('.total-minus');
		this.wrapListTotal = document.querySelector('.wrap-list-total');
		this.balansInput = document.getElementById('balans');
		this.buysInput = document.getElementById('buys');
		this.priceInput = document.getElementById('price');
		this.totalSumm = document.querySelector('.total-summ');
		this.balans = 0;
		this.itemId = 0;
		this.itemList = [];
	}

	getExpenseAll() {
		let total = 0;
		if(this.itemList.length > 0) {
			total = this.itemList.reduce((acc, current) => {
				return acc += +(current.cost);
			}, 0);
		}	
		return total;
	}

	submitAddToBalans(){
		const total = this.balansInput.value;
		if(isValidation(total)){
			this.balans += +(total);
			this.totalBalanse.textContent = this.balans;
			this.balansInput.value = '';
			this.showTotal();
		} else {
			alert('Your data is not correct!!!');
		}
	}

	submitExpense() {
		const expense = this.buysInput.value.trim();
		const expenseAmount = this.priceInput.value;
		if(isValidation(expense) && isValidation(expenseAmount))
		{
			this.buysInput.value = '';
			this.priceInput.value = '';
			this.addExpense(expense, expenseAmount);
		} else {
			alert('Your data is not correct!!!');
		}
	}

	addExpense(expense, expenseAmount) {
		let itemExpense = {
			id: this.itemId,
			title: expense,
			cost: expenseAmount
		};
		this.itemId++;
		this.itemList.push(itemExpense);
		this.totalMinus.textContent = `-${this.getExpenseAll()}`;
		this.listItems.insertAdjacentHTML('beforeend', listElement(itemExpense));
		this.showTotal();
	}

	showTotal() {
		const total = this.totalExpense();
		this.totalSumm.textContent = total + ' $';
	}


	totalExpense() {
		return this.balans - this.getExpenseAll();
	}

	removeItemList(elem, id) {
		const temp = this.itemList.filter(item => {
			return item.id != id;
		});
		this.itemList.length = 0;
		this.itemList = temp;
		let parent = elem.closest('.list-item');
		this.listItems.removeChild(parent);
		this.totalMinus.textContent = `-${this.getExpenseAll()}`;
		this.showTotal();
	}

	removeItem(elem){
		const id = elem.dataset.id;
		const arr = this.itemList.filter((item) => {
			return item.id == id;
		});
		this.removeItemList(elem, id);
		return arr;
	}

}
export default UI;