
const listItems = document.querySelector('.list-items'),
    submit = document.querySelector('.submit'),
    addBalans = document.querySelector('.add-balans'),
    totalBalanse = document.querySelector('.total-balanse'),
    totalMinus = document.querySelector('.total-minus'),
    wrapListTotal = document.querySelector('.wrap-list-total');
const balansInput = document.getElementById('balans'),
    buysInput = document.getElementById('buys'),
    priceInput = document.getElementById('price');
//============GLOBAL=VARIABLE===================

let balans = 0;
let totalMinusBalans = 0;
let count = 0;
const listElements = [];
let totalCash = {
    summ : 0,
    minus : 0
};
//=================FUNCTION=====================

const createListItem = (id) => {
    if(listElements[id]){
    const data = listElements[id].elem;
    const element = `
        <li class="list-item d-flex justify-content-around shadow bg-white regular mb-3 p-3">
            <span class="list-title p-1 pr-4 border-info">${data.title}</span>
            <span class="list-cost text-danger border p-1 pl-4 pr-4 border-danger">-${data.cost} $</span>
            <span class="list-cost-ost border p-1 pl-4 pr-4 border-dark">${balans} $</span>  
        </li>
    `;
    listItems.insertAdjacentHTML('afterbegin', element);
    } else {
        alert('ERROR: line 34');
        throw new Error (`Неверный идентификатор: ${id}, 
        попытка получить undefined из массива ${listElements[id]}`);
    }

};

const renderTotalCash = (price) => {
    totalCash.summ -= +(price);
    totalCash.minus += +(price);
    if (totalCash.summ < 0) {
        totalBalanse.classList.remove('text-success');
        totalBalanse.classList.add('color-brown');
    }
    totalBalanse.textContent = totalCash.summ + ' $'; 
    totalMinus.textContent = '-' + totalCash.minus + ' $';
};

const isCheckedBuyInputs = () => {
    const priceStr = priceInput.value.trim();
    const buyStr = buysInput.value.trim(); 
    return buyStr && priceStr ? true : false;
};

const createListUI = () => {
    if(isCheckedBuyInputs()){
        renderTotalCash(priceInput.value);
        listElements.push({
        elem : {
            title : buysInput.value,
            cost : priceInput.value,
            id : count
        },
    });
    createListItem(count++);
    buysInput.value = '';
    priceInput.value = '';
    } else {
        alert('Fuck you dumb user');
    }
    
};

const addToBalans = () => {
    if(balansInput.value > 0){
        totalCash.summ += +(balansInput.value);
        totalBalanse.textContent = totalCash.summ + ' $'; 
        balansInput.value = ''; 
    } else {
        const balansTitle = document.querySelector('.balans-container h4');
        const checkedAddToBalans = (cls1, cls2) => {
            addBalans.classList.remove(cls1);
            addBalans.classList.add(cls2);
        };
        checkedAddToBalans('btn-info', 'btn-danger');
        addBalans.setAttribute("disabled", true);
        balansTitle.textContent = 'Вы ввели некоректные данные';
        setTimeout(() => {
            checkedAddToBalans('btn-danger', 'btn-info');
            addBalans.removeAttribute("disabled", null);
            balansTitle.textContent = 'Введите ваши заработанные деньги';
        }, 2000);
    }
    
};

//===================EVENTS======================
submit.addEventListener('click', createListUI);
addBalans.addEventListener('click', addToBalans);