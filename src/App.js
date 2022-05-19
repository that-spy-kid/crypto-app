import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        console.log(res.data);
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Cryptocurrency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search a Crypto"
          />
        </form>
      </div>
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <p className="coin-data" style={{ marginLeft: "30px" }}>COIN</p>
            <p className="coin-symbol" style={{ marginRight: "30px" }}>
              symbol
            </p>
          </div>
          <div className="coin-data">
            <p className="coin-price">PRICE</p>
            <p className="coin-volume">VOLUME</p>
            <p className="coin-percent">CHANGE</p>

            <p className="coin-marketcap">MARKETCAP</p>
          </div>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            volume={coin.total_volume}
            marketcap={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;