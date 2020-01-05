export class TradeWidget {
  constructor({ element }) {
    this._el = element;

    this._el.addEventListener('input', e => {
      const value = Number(e.target.value);
      this._updateDisplay(value);
    });
  }

  _trade(item) {
    this._currentItem = item;
    this._total = 0;

    this._render();
  }

  _updateDisplay(value) {
    this._totalEl = this._el.querySelector('#item-total');
    this._totalEl.textContent = this._currentItem.price * value;
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
          <a href="#!" class="modal-close waves-effect waves-teal btn-flat">Buy</a>
          <a href="#!" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
        </div>
      </div>
    `;
  }
}