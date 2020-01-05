"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = exports.Table = function () {
  function Table(_ref) {
    var element = _ref.element;

    _classCallCheck(this, Table);

    this._el = element;
    this._render();
  }

  _createClass(Table, [{
    key: "_render",
    value: function _render() {
      this._el.innerHTML = "\n      <table class=\"data-table highlight\">\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Symbol</th>\n            <th>Rank</th>\n            <th>Price</th>\n          </tr>\n        </thead>\n        <tbody></tbody>\n      </table>\n    ";
    }
  }]);

  return Table;
}();