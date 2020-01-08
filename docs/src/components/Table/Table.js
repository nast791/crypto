import { Component } from "../Component/Component.js";

export class Table extends Component {
  constructor({ element, data }) {
    super();
    this._el = element;
    this._render(data);

    this._el.addEventListener('click', e => this._onRowClick(e));
  }

  _onRowClick(e) {
    const target = e.target.closest('tr[data-id]');
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      const clickEvent = new CustomEvent('rowClick', {
        detail: id,
      });
      this._el.dispatchEvent(clickEvent);
    }
  }

  update(data) {
    this._render(data);
  }

  _render(data) {
    this._el.innerHTML = `
      <table class="data-table highlight">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Rank</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.map(item =>
            `
            <tr data-id="${item.id}">
              <td>${item.name}</td>
              <td>${item.symbol}</td>
              <td>${item.rank}</td>
              <td>${item.price}</td>
            </tr>
            `  
            ).join('')
          }
        </tbody>
      </table>
    `;
  }
}