import { HttpService } from './HttpService.js';

const data =
[
  {
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 1000
  },
  {
    "id": "eth-ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": 2,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 900
  },
  {
    "id": "xrp-xrp",
    "name": "XRP",
    "symbol": "XRP",
    "rank": 3,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 800
  },
  {
    "id": "eos-eos",
    "name": "EOS",
    "symbol": "EOS",
    "rank": 4,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 700
  },
  {
    "id": "ltc-litecoin",
    "name": "Litecoin",
    "symbol": "LTC",
    "rank": 5,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 600
  },
  {
    "id": "bch-bitcoin-cash",
    "name": "Bitcoin Cash",
    "symbol": "BCH",
    "rank": 6,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 500
  },
  {
    "id": "ada-cardano",
    "name": "Cardano",
    "symbol": "ADA",
    "rank": 11,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 400
  },
  {
    "id": "miota-iota",
    "name": "IOTA",
    "symbol": "MIOTA",
    "rank": 14,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 300
  },
  {
    "id": "neo-neo",
    "name": "NEO",
    "symbol": "NEO",
    "rank": 17,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 200
  },
  {
    "id": "xem-nem",
    "name": "NEM",
    "symbol": "XEM",
    "rank": 19,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 100
  }
];

const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = id => `${COINS_URL}/${id}/ohlcv/latest`;

export const DataService = {
  async getCurrencies(query = {filter: ''}) {
    let {filter} = query;

    try {
      let data = await HttpService.sendRequest(COINS_URL);
      data = data.filter(item => {
        return item.name.toLowerCase().includes(filter);
      }).slice(0, 10);
      return DataService.getCurrenciesPrices(data);
    } catch (err) {
      console.error(err);
    }
  },

  async getCurrenciesPrices(data) {
    let coinsUrls = data.map(coin => getSingleCoinUrl(coin.id));
    let dataPrices = await HttpService.sendMultipleRequests(coinsUrls);

    data.map((item, index) => {
      let coinPrice = dataPrices[index][0] || {close: NaN};
      item.price = coinPrice.close.toFixed(2);
      return item;
    });
    return data;
  }
}