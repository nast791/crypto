export class Basket {
  constructor({ element, balance, updateBalance, items }) {
    this._el = element;
    this._items = items || {};
    this._balance = balance;
    this._portfolioWorth = 0;

    this._render();
  }

  updateItem(buyItem) {
    const item = buyItem.item;
    const amount = buyItem.amount;
    const currentItem = this._items[item.id] || { // ищем в общем объекте ключ с id итема, если его нет, создаем новый объект currentItem
      name: item.name,
      id: item.id,
      price: item.price,
      amount: 0,
      total: 0,
    }

    currentItem.amount += Number(amount); // дописываем количество
    currentItem.total = item.price * currentItem.amount; // меняем общую сумму
    this._items[item.id] = currentItem; // добавляем в общий объект "id итема": "currentItem"

    this._portfolioWorth = (Object.values(this._items).reduce((sum, item) => sum + item.total, 0)).toFixed(2); // в каждом итеме находим общую сумму, складываем эти суммы
    this._render();
  }

  updateBalance(newBalance) {
    this._balance = newBalance;
    this._render();
  }

  _render() {
    const items = Object.values(this._items); // объекты-покупки в массив

    this._el.innerHTML = `
      <ul class="collapsible portfolio">
        <li>
          <p class="collapsible-header">
            Current balance: $${this._balance}.
            Portfolio Worth: $${this._portfolioWorth}.
          </p>
          <div class="collapsible-body">
            <table class="highlight striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${
                  items.length === 0 ? '' : `
                  ${items.map(item => `
                    <tr data-id="${item.id}">
                      <td>${item.name}</td>
                      <td>${item.amount}</td>
                      <td>${item.price}</td>
                      <td>${item.total}</td>
                    </tr>
                  `).join('')}
                  `
                }
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    `;
    let elems = this._el.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }
}