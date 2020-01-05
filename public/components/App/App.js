'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Table = require('../Table/Table.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
  function App(_ref) {
    var element = _ref.element;

    _classCallCheck(this, App);

    this._el = element;
    this._render();
    this._initTable();
  }

  _createClass(App, [{
    key: '_render',
    value: function _render() {
      this._el.innerHTML = '\n      <div class="row">\n        <div class="col s12">\n          <h1>Tiny Crypto Market</h1>\n        </div>\n        <div class="row">\n          <div class="col s12" data-element="table"></div>\n        </div>\n      </div>\n    ';
    }
  }, {
    key: '_initTable',
    value: function _initTable() {
      this._table = new _Table.Table({
        element: this._el.querySelector('[data-element=table]')
      });
    }
  }]);

  return App;
}();