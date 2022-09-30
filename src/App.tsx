import React, { useEffect } from 'react';
import { TradePrice } from './components/TradePrice';
import { useAppDispatch, useAppSelector } from './redux/store';
import { fetchTradePrice } from './redux/tradePriceSlice';
import './Styles/index.css';


interface ICurrencyData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}


function App() {
  const dispatch = useAppDispatch();
  const {tradePrice} = useAppSelector(state => state.trade);

  useEffect(() => {
    dispatch(fetchTradePrice());
  }, []);

  return (
    <div className='app'>
      <header className='app--header'>
        <div className='header--exchange'>
          <div className='header--number'>USD: {tradePrice.length && tradePrice.find(d => d.ccy === 'USD')!.sale}</div>
          <div className='header--number'>EUR: {tradePrice.length && tradePrice.find(d => d.ccy === 'EUR')!.sale}</div>
        </div>
      </header>
      <TradePrice />
    </div>
  );
}

export default App;
