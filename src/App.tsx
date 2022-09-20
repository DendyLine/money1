import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import './Styles/index.css';


interface ICurrencyData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}


function App() {
  const [data, setData] = useState([] as ICurrencyData[]);
  const [firstInput, setFirstInput] = useState(1);
  const [secondInput, setSecondInput] = useState(1);
  const [firstSelect, setFirstSelect] = useState('UAH');
  const [secondSelect, setSecondSelect] = useState('USD');
  const [lastUsedInput, setLastUsedInput] = useState('UAH');


  const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
  useEffect(() => {
    axios.get(url).then((response: any) => {
      setData([{
        ccy: 'UAH',
        sale: '1',
        base_ccy: 'UAH',
        buy: '1'
      }, ...response.data.filter((d: any) => d.base_ccy === 'UAH')]);

    });
  }, []);

  useEffect(() => {
    if (!data.length) return;
    onInputChange(firstInput, setFirstInput, secondInput, setSecondInput, firstSelect, secondSelect);

  }, [data.length]);


  const onInputChange = (currValue: number, currSetter: any, oppValue: number, oppSetter: any, currCurrency: string, oppCurrency: string, updateInput = true) => {
    currSetter(currValue);
    const currRate = +data.find(d => d.ccy === currCurrency)!.sale;
    const oppRate = +data.find(d => d.ccy === oppCurrency)!.sale;
    oppSetter(Number((+currValue * (currRate / oppRate)).toFixed(2)));
    updateInput && setLastUsedInput(currCurrency);
  };


  const onFirstSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFirstSelect(e.target.value);
    if (lastUsedInput === secondSelect) {
      onInputChange(secondInput, setSecondInput, firstInput, setFirstInput, secondSelect, e.target.value, false);
    } else {
      onInputChange(firstInput, setFirstInput, secondInput, setSecondInput, e.target.value, secondSelect, false);
    }
  };

  const onSecondSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSecondSelect(e.target.value);
    if (lastUsedInput === firstSelect) {
      onInputChange(firstInput, setFirstInput, secondInput, setSecondInput, firstSelect, e.target.value, false);
    } else {
      onInputChange(secondInput, setSecondInput, firstInput, setFirstInput, e.target.value, firstSelect, false);
    }
  };


  if (!data.length)
    return <div>Loading...</div>;


  return (
    <div className='app'>
      <header className='app--header'>
        <div className='header--exchange'>
          <div className='header--number'>USD: {data.find(d => d.ccy === 'USD')!.sale}</div>
          <div className='header--number'>EUR: {data.find(d => d.ccy === 'EUR')!.sale}</div>
        </div>
      </header>
      <main className='app--main'>
        <fieldset className='main--converter'>
          <select name='' value={firstSelect} onChange={onFirstSelectChange}>
            {data.map(({ccy}) => <option value={ccy}>{ccy}</option>)}
          </select>
          <input
            type='number'
            value={firstInput}
            onChange={e => onInputChange(+e.target.value, setFirstInput, secondInput, setSecondInput, firstSelect, secondSelect)}
          />
        </fieldset>
        <fieldset className='main--converter'>
          <select name='' value={secondSelect} onChange={onSecondSelectChange}>
            {data.map(({ccy}) => <option value={ccy}>{ccy}</option>)}
          </select>
          <input
            type='number'
            value={secondInput}
            onChange={e => onInputChange(+e.target.value, setSecondInput, firstInput, setFirstInput, secondSelect, firstSelect)}
          />
        </fieldset>

      </main>
    </div>
  );
}

export default App;
