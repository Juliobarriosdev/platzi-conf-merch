import { useState, useEffect } from 'react';
import initialState from '../initialState';

const API = '/link'

const useIntialState = () => {
  const [state, setState] = useState(initialState);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API);
      const data = await response.json();
      setProduct(data);
    }
  });

  const addToCart = (payload) => {
    setState({
      ...state, 
      cart: [...state.cart, payload],
    });
  };

  const removeFromCart = (payload) => {
    const newCart = state.cart;
    newCart.splice(payload, 1);

    setState({
      ...state,
      cart: newCart,
    });
  };

  const addToBuyer = (payload) => {
    setState({
      ...state,
      buyer: [...state.buyer, payload],
    });
  };
  const addNewOrder = payload => {
    setState({
      ...state,
      orders: [...state.orders, payload]
    })
  };
  const addCoord = payload => {
    setState({
      ...state,
      coord: [...state.coord, payload]
    })
  }
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = state.cart.reduce(reducer, 0);
    return sum;
  };
  const test = () => console.log(state);

  return {
    addToCart,
    removeFromCart,
    addToBuyer,
    addNewOrder,
    handleSumTotal,
    addCoord,
    test,
    state
  };
};

export default useIntialState;
