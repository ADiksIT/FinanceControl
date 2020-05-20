import UI from './UI.js';
import Modal from './Modal.js';
const ui = new UI();
const modals = new Modal(ui);

ui.addBalans.addEventListener('click', () => {
    ui.submitAddToBalans();
});

ui.submit.addEventListener('click', () => {
    ui.submitExpense();
});

ui.listItems.addEventListener('click', (evt) => {
    const target = evt.target;
    //delegation change
    if(target.classList.contains('change')){
        modals.show(modals.modal);
        const data = modals.editingItem(target.closest('.buttons'));
        //add item to list and removeEventListener
        const setList = () => {
            ui.addExpense(data[0].title, data[0].cost);
            modals.hide(modals.modal);
            modals.modal.removeEventListener('click', handler);
        };
        //delegation for modal editItem
        const handler = (event) => {
            if(event.target.classList.contains('modals__close')) {
                setList();
            }
            if(event.target.classList.contains('modals__submit')) {
                setList();
            }
        };
        modals.modal.addEventListener('click', handler);
    }
    //delegation btn delte
    if(target.classList.contains('delete')){
        modals.show(modals.modalYes);
        //get elem with button and = data
        const btns = target.closest('.buttons');
        const btnId =  target.closest('.buttons').dataset.id;
        //delegation modal window "DELETE"
        const changeModal = (event) =>  {
            const target = event.target;
            if(target.classList.contains('modals-yes__ok')) { 
                ui.removeItemList(btns, btnId);
                modals.hide(modals.modalYes);
            }
            if(target.classList.contains('modals-yes__no')) { 
                modals.hide(modals.modalYes);
            }
            modals.modalYes.removeEventListener('click', changeModal);
        };
        modals.modalYes.addEventListener('click', changeModal);
    }
});