import { Component } from "../Component/Component.js";

export class TradeWidget extends Component {
  constructor({ element, callBack, updateBalance }) {
    super();
    this._el = element;
    this._updateBalance = updateBalance || function() {};
    this._callBack = callBack || function() {};

    this._el.addEventListener('input', (e) => {
      let value = Number(e.target.value);
      this._balance = this._updateBalance();
      if (this._currentItem.price * value > this._balance) {
        value = Math.floor(this._balance / this._currentItem.price);
        e.target.value = value;
      }
      this._updateDisplay(value);
    });

    this._el.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('[data-action=close]')) {
        this._close();
      }

      if (e.target.closest('[data-action=buy]')) {
        const numeric = new RegExp(/^\d+$/); // только числа
        const amountValue = this._el.querySelector('#amount').value;
        if (numeric.test(amountValue) && amountValue > 0) {
          this._buyItem = {
            item: this._currentItem,
            amount: amountValue,
          };
          this._callBack(this._buyItem);
        }
        this._close();
      }
    });
  }

  _close() {
    this._el.querySelector('#modal').classList.remove('open');
  }

  trade(item) {
    this._currentItem = item;
    this._total = 0;
    this._render();
  }

  _updateDisplay(value) {
    this._totalEl = this._el.querySelector('#item-total');
    this._value = value;
    this._totalEl.textContent = (this._currentItem.price * this._value).toFixed(2);
  }

  _render() {
    this._el.innerHTML = `
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${this._currentItem.name}</h4>
          <p>
            Current price: ${this._currentItem.price}. Total: <span id="item-total">${this._total}</span>
          </p>
          <div class="row">
            <form class="col s12">
              <div class="input-field col s4">
                <input id="amount" type="number" min="0" pattern="[0-9]" inputmode="numeric">
                <label for="amount">Amount</label>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#!" data-action="buy" class="modal-close waves-effect waves-teal btn-flat modal-buy">Buy</a>
          <a href="#!" data-action="close" class="modal-close waves-effect waves-teal btn-flat modal-cancel">Cancel</a>
        </div>
      </div>
    `;
  }
}