import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_TYPES = 'GET_TYPES';
export const GET_FOR_ID = 'GET_FOR_ID';
export const GET_BY_NAME = 'GET_BY_NAME';
export const RESET_FILTERED_PRODUCTS = 'RESET_FILTERED_PRODUCTS';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

export function loading() {
  return { type: LOADING };
}

export function handleError() {
  return { type: ERROR };
}

export function getAllProducts() {
  return function (dispatch) {
    axios
      .get('http://localhost:3001/product')
      .then((response) =>
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError());
        console.error(error);
      });
  };
}
export function getTypes() {
  return function (dispatch) {
    axios
      .get('http://localhost:3001/type')
      .then((response) => dispatch({ type: GET_TYPES, payload: response.data }))
      .catch((error) => {
        dispatch(handleError());
        console.error(error);
      });
  };
}
export function getForId(id) {
  return function (dispatch) {
    dispatch(loading());
    axios
      .get(`http://localhost:3001/product/${id}`)
      .then((response) =>
        dispatch({ type: GET_FOR_ID, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}
export function getByName(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/product?name=${name}`)
      .then((response) =>
        dispatch({ type: GET_BY_NAME, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError());
        console.error(error);
      });
  };
}

export function resetFilteredProducts() {
  return { type: RESET_FILTERED_PRODUCTS };
}
