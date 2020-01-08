import {Table} from '../Table/Table.js';
import {Basket} from '../Basket/Basket.js';
import {TradeWidget} from '../TradeWidget/TradeWidget.js';
import {Filter} from '../Filter/Filter.js';
import {DataService} from '../../services/DataService.js';

export class App {
  constructor({ element }) {
    this._el = element;
    this._userBalance = Number(10000);
    this._render();

    this._getData();
    this._initBasket();
    this._initTradeWidget();
    this._initFilter();
  }

  async _getData() {
    let data = await DataService.getCurrencies();
    this._data = data;
    this._initTable();
  }

  _render() {
    this._el.innerHTML = `
      <div class="row">
        <div class="col s12">
          <h1>Tiny Crypto Market</h1>
        </div>
        <div class="row">
          <div class="col s12" data-element="filter"></div>
        </div>
        <div class="row">
          <div class="col s12" data-element="table"></div>
        </div>
        <div class="col s6 offset-s6" data-element="basket"></div>
        <div data-element="trade-widget"></div>
      </div>
    `;
  }

  _tradeItem(id) {
    const item = this._data.find(it => it.id === id);
    this._tradeWidget.trade(item);
  }

  _initTable() {
    this._table = new Table({
      element: this._el.querySelector('[data-element=table]'),
      data: this._data,
    });

    this._table.on('rowClick', e => this._tradeItem(e.detail));
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
      callBack: (buyItem) => {
        const purchasePrice = buyItem.item.price * buyItem.amount;
        this._userBalance -= purchasePrice;
        this._basket.updateItem(buyItem);
        this._basket.updateBalance(this._userBalance.toFixed(2));
      },
      updateBalance: () => this._userBalance.toFixed(2),
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: this._el.querySelector('[data-element=filter]'),
    });
    this._filter.on('filter', async e => {
      const filterValue = e.detail;
      const filterData = await DataService.getCurrencies({ filter: filterValue });
      this._data = filterData;
      this._table.update(this._data);
    });
  }
}