export class TradeWidget {
  static total = 0;

  constructor({ element, balance, callBack }) {
    this._el = element;
    this._balance = balance;
    this._callBack = callBack;

    this._el.addEventListener('input', e => {
      let value = Number(e.target.value);
      if (this._currentItem.price * value > this._balance) {
        value = Math.floor(this._balance / this._currentItem.price);
        e.target.value = value;
      }
      this._updateDisplay(value);
    });

    this._el.addEventListener('click', e => {
      const targetCancel = e.target.closest('.modal-cancel');
      if (targetCancel) {
        this._close();
      }
      const targetBuy = e.target.closest('.modal-buy');
      if (targetBuy) {
        if (this._value) {
          this._callBack(this._buyItem);
        }
        this._close();
      }
    });
  }

  _close() {
    const modalWindow = this._el.querySelector('#modal');
    modalWindow.classList.remove('open');
  }

  _trade(item) {
    this._currentItem = item;
    this._total = 0;
    this._render();
  }

  _updateDisplay(value) {
    this._totalEl = this._el.querySelector('#item-total');
    this._value = value;
    this._totalEl.textContent = this._currentItem.price * this._value;
    TradeWidget.total += Number(this._totalEl.textContent);
    this._buyItem = {
      name: this._currentItem .name,
      amount: this._value,
      price: this._currentItem.price,
      worth: TradeWidget.total,
      total: this._totalEl.textContent,
    };
  }

  _render() {
    this._el.innerHTML = `
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${this._currentItem .name}</h4>
          <p>
            Current price: ${this._currentItem .price}. Total: <span id="item-total">${this._total}</span>
          </p>
          <div class="row">
            <form class="col s12">
              <div class="input-field col s4">
                <input id="amount" type="number">
                <label for="amount">Amount</label>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-teal btn-flat modal-buy">Buy</a>
          <a href="#!" class="modal-close waves-effect waves-teal btn-flat modal-cancel">Cancel</a>
        </div>
      </div>
    `;
  }
}