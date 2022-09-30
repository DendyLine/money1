import React, { ChangeEvent } from 'react';
import { useAppSelector } from '~/redux/store';


interface IExchangerProps {
  selectValue: string;
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  inputValue: number;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Exchanger = ({onSelectChange, selectValue, inputValue, onInputChange}: IExchangerProps) => {
  const data = useAppSelector(state => state.trade.tradePrice);
  return (
    <fieldset className='main--converter'>
      <select name='' value={selectValue} onChange={onSelectChange}>
        {data.map(({ccy}) => <option value={ccy}>{ccy}</option>)}
      </select>
      <input
        type='number'
        value={inputValue}
        onChange={onInputChange}
      />
    </fieldset>
  );
};