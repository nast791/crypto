import {Table} from '../Table/Table.js';
import {Basket} from '../Basket/Basket.js';
import {TradeWidget} from '../TradeWidget/TradeWidget.js';
import {DataService} from '../../services/DataService.js';

export class App {
  constructor({ element }) {
    this._el = element;
    this._data = DataService.getData();
    this._userBalance = 10000;

    this._render();
    this._initTable();
    this._initBasket();
    this._initTradeWidget();
  }

  _render() {
    this._el.innerHTML = `
      <div class="row">
        <div class="col s12">
          <h1>Tiny Crypto Market</h1>
        </div>
        <div class="row portfolio-row">
          <div class="col s6 offset-s6" data-element="basket"></div>
        </div>
        <div class="row">
          <div class="col s12" data-element="table"></div>
        </div>
        <div data-element="trade-widget"></div>
      </div>
    `;
  }

  _tradeItem(id) {
    const item = this._data.find(it => it.id === id);
    this._tradeWidget._trade(item);
  }

  _initTable() {
    this._table = new Table({
      element: this._el.querySelector('[data-element=table]'),
      data: this._data,
      onRowClick: (id) => this._tradeItem(id),
    });
  }

  _initBasket() {
    this._basket = new Basket({
      element: this._el.querySelector('[data-element=basket]'),
      balance: this._userBalance,
    });
  }

  _initTradeWidget() {
    this._tradeWidget = new TradeWidget({
      element: this._el.querySelector('[data-element=trade-widget]'),
    });
  }
}