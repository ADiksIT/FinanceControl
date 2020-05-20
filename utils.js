export const isValidation = value => value.trim() === '' || value <= 0 ? false : true;


export const listElement = (expense) => {
	const { id, title, cost } = expense;
 	const element = `
	<li class="list-item d-flex 
			justify-content-around shadow bg-white regular mb-3 p-3">
		<span class="list-title p-1 pr-4 border-info">${title}</span>
		<span class="list-cost text-danger border p-1 pl-4 pr-4 border-danger">-${cost} $</span>
		<div class="buttons"  data-id = "${id}">
			<button class="btn change">&#9998</button>
			<button class="btn delete">&#10008</button>
		</div>
	</li>
	`;
	return element;
};