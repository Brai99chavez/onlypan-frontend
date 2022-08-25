import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_TYPES = 'GET_TYPES';
export const GET_FOR_ID = 'GET_FOR_ID';
export const GET_BY_NAME = 'GET_BY_NAME';
export const RESET_FILTERED_PRODUCTS = 'RESET_FILTERED_PRODUCTS';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const SORT_BY_PRICE = 'SORT_BY_PRICE';
export const MIXED_SORT = 'MIXED_SORT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';


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
      .get(`http://localhost:3001/product/query?name=${name}`)
      .then((response) =>
        dispatch({ type: GET_BY_NAME, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError());
        console.error(error);
      });
  };
}

export function filterByType(type) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/product/type?name=${type}`)
      .then((response) =>
        dispatch({ type: FILTER_BY_TYPE, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function sortByPrice(price) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/product/price?name=${price}`)
      .then((response) =>
        dispatch({ type: SORT_BY_PRICE, payload: response.data })
      );
  };
}

export function mixedSort(option) {
  return function (dispatch) {
    axios
      .get(
        `http://localhost:3001/product/typ?type=${option.type}&price=${option.sort}`
      )
      .then((response) =>
        dispatch({ type: MIXED_SORT, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function resetFilteredProducts() {
  return { type: RESET_FILTERED_PRODUCTS };
}

export function createProduct(value) {
  return function (dispatch) {
    axios
      .post('http://localhost:3001/product', value)
      .then((response) => dispatch({ type: CREATE_PRODUCT }))
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}
