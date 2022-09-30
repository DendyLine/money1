import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export interface ICurrencyData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export const fetchTradePrice = createAsyncThunk('price', async () => {
  const res = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
  const json = await res.json();
  return [{
    ccy: 'UAH',
    sale: '1',
    base_ccy: 'UAH',
    buy: '1'
  }, ...json.filter((d: any) => d.base_ccy === 'UAH')] as ICurrencyData[];
});

const tradePriceSlice = createSlice({
  name: 'tradePrise',
  initialState: {
    firstInput: 1,
    secondInput: 1,
    firstSelect: 'UAH',
    secondSelect: 'USD',
    tradePrice: [] as ICurrencyData[]
  },
  reducers: {
    updateSecondInput(state, action) {
      state.secondInput = action.payload;
      const currRate = +state.tradePrice.find(d => d.ccy === state.secondSelect)!.sale;
      const oppRate = +state.tradePrice.find(d => d.ccy === state.firstSelect)!.sale;
      state.firstInput = Number((action.payload * (currRate / oppRate)).toFixed(2));
    },
    updateFirstInput(state, action) {
      state.firstInput = action.payload;
      const currRate = +state.tradePrice.find(d => d.ccy === state.firstSelect)!.sale;
      const oppRate = +state.tradePrice.find(d => d.ccy === state.secondSelect)!.sale;
      state.secondInput = Number((action.payload * (currRate / oppRate)).toFixed(2));
    },
    updateFirstSelect(state, action) {
      state.firstSelect = action.payload;
    },
    updateSecondSelect(state, action) {
      state.secondSelect = action.payload;
    }
  },
  extraReducers: ({addCase}) => {
    addCase(fetchTradePrice.fulfilled, (state, action) => {
      state.tradePrice = action.payload;
    });
  }
});
export const {updateSecondInput, updateSecondSelect, updateFirstSelect, updateFirstInput} = tradePriceSlice.actions;

export default tradePriceSlice.reducer;