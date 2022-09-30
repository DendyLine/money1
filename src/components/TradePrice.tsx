import React, { ChangeEvent, useEffect } from 'react';
import { Exchanger } from '~/components/Exchanger';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { updateFirstInput, updateFirstSelect, updateSecondInput, updateSecondSelect, } from '~/redux/tradePriceSlice';


export const TradePrice = () => {
  const dispatch = useAppDispatch();
  const {tradePrice, firstInput, firstSelect, secondSelect, secondInput} = useAppSelector(state => state.trade);

  const onFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFirstInput(+e.target.value));
  };
  const onSecondInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSecondInput(+e.target.value));
  };
  const onSecondSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSecondSelect(e.target.value));
    dispatch(updateSecondInput(secondInput));
  };
  const onFirstSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFirstSelect(e.target.value));
    dispatch(updateFirstInput(firstInput));
  };

  // if (!tradePrice.length)
  //   return <div>Loading...</div>;

  useEffect(() => {
    if (!tradePrice.length) return;
    dispatch(updateFirstInput(1));
  }, [tradePrice.length]);


  return (
    <main className='app--main'>
      <Exchanger
        inputValue={firstInput}
        selectValue={firstSelect}
        onInputChange={onFirstInputChange}
        onSelectChange={onFirstSelectChange}
      />
      <Exchanger
        inputValue={secondInput}
        selectValue={secondSelect}
        onInputChange={onSecondInputChange}
        onSelectChange={onSecondSelectChange}
      />
    </main>

  );
};

