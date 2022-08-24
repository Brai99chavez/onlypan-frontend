import axios from 'axios'; 

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"


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