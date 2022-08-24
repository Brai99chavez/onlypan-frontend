import axios from 'axios';

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_BY_NAME = 'GET_BY_NAME';
export const RESET_FILTERED_PRODUCTS = "RESET_FILTERED_PRODUCTS";


export function getAllProducts() {
  return function (dispatch) {
    axios.get('http://localhost:3001/product')
      .then((response) =>
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data })
      )
      .catch((error) => {
        console.error(error);
      });
  };
}

export function getByName(name) {
  return function (dispatch) {

    axios.get(`http://localhost:3001/product?name=${name}`).then((response) =>
      dispatch({ type: GET_BY_NAME, payload: response.data }).catch(
        (error) => {
          console.error(error);
        }
      )
    );
  };
}

export function resetFilteredProducts(name) {
  return function (dispatch) {
    dispatch({ type: RESET_FILTERED_PRODUCTS })
  };
}