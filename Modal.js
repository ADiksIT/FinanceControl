export default class Modal {
	constructor(ui){
		this.modal = document.querySelector('.modals');
		this.modalYes = document.querySelector('.modals-yes');
		this.modalsYesOk = document.querySelector('.modals-yes__ok');
		this.modalsYesNo = document.querySelector('.modals-yes__no');
		this.modalExpense = this.modal.querySelector('.modals__expense');
		this.modalAmount = this.modal.querySelector('.modals__amount');
		this.modalSubmit = this.modal.querySelector('.modals__submit');
		this.modalClose = this.modal.querySelector('.modals__close');
		this.ui = ui;
	}

	show(modal) {
		modal.classList.remove('hide');
		modal.classList.add('show');
	}

	hide(modal) {
		modal.classList.remove('show');
		modal.classList.add('hide');
	}

	editingItem(elem) {
		const data = this.ui.removeItem(elem);
		this.modalExpense.value = data[0].title;
		this.modalAmount.value = data[0].cost;
		this.modalSubmit.addEventListener('click', () => {
			data[0].title = this.modalExpense.value;
			data[0].cost = this.modalAmount.value;
			return data;
		});
		return data;
	}
}