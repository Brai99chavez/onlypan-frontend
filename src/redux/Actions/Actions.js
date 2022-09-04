import axios from 'axios';
export const CLEAR_DETAIL_PRODUCT = 'CLEAR_DETAIL_PRODUCT';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_TYPES = 'GET_TYPES';
export const GET_PRODUCT_FOR_ID = 'GET_FOR_ID';
export const GET_PRODUCT_BY_NAME = 'GET_BY_NAME';
export const GET_USER_ORDERS = 'GET_USER_ORDERS';
export const RESET_FILTERED_PRODUCTS = 'RESET_FILTERED_PRODUCTS';
export const MIXED_SORT = 'MIXED_SORT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const GET_SCORES_FOR_USER = 'GET_SCORES_FOR_USER';
export const GET_SCORES_FOR_USER_AND_PRODUCT =
  'GET_SCORES_FOR_USER_AND_PRODUCT';
export const GET_SCORES_FOR_PRODUCT = 'GET_SCORES_FOR_PRODUCT';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const CHANGE_ROL_BY_ADMIN = 'CHANGE_ROL_BY_ADMIN';
export const SEARCH_LOCALITATION = 'SEARCH_LOCALITATION'
export const DELETE_LOCATION_SEARCH = 'DELETE_LOCATION_SEARCH' 
export const SEARCH_UBICATION = 'SEARCH_UBICATION'
export const CREATE_USER_CART = 'CREATE_USER_CART';
export const GET_USER_CART = 'GET_USER_CART';

export function loading() {
  return { type: LOADING };
}

export function handleError(error) {
  return { type: ERROR, error };
}

export function getAllProducts() {
  return function (dispatch) {
    axios
      .get('/product')
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
      .get('/type')
      .then((response) => dispatch({ type: GET_TYPES, payload: response.data }))
      .catch((error) => {
        dispatch(handleError());
        console.error(error);
      });
  };
}
export function getProductForId(id) {
  return function (dispatch) {
    dispatch(loading());
    axios
      .get(`/product/${id}`)
      .then((response) =>
        dispatch({ type: GET_PRODUCT_FOR_ID, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function clearDetailProduct() {
  return function (dispatch) {
    dispatch({ type: CLEAR_DETAIL_PRODUCT });
  };
}

export function getByName(name) {
  return function (dispatch) {
    axios
      .get(`/product/query?name=${name}`)
      .then((response) =>
        dispatch({ type: GET_PRODUCT_BY_NAME, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError());
        console.error(error);
      });
  };
}

export function combinedFilter(option) {
  return function (dispatch) {
    axios
      .get(
        `/product/combined?type=${option.type}&price=${option.sort}&priceMin=${option.min}&priceMax=${option.max}`
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
      .post('/product', value)
      .then((response) => dispatch({ type: CREATE_PRODUCT }))
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}
export function getUserOrders(id) {
  return function (dispatch) {
    axios
      .get(`/order?userId=${id}`)
      .then((response) =>
        dispatch({ type: GET_USER_ORDERS, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function getScoresForUser(userId) {
  return function (dispatch) {
    axios
      .get('/review/get/' + userId)
      .then((response) =>
        dispatch({ type: GET_SCORES_FOR_USER, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function getScoresForUserAndProduct(userId, productId) {
  return function (dispatch) {
    axios
      .get(`/review/get?userId=${userId}&productId=${productId}`)
      .then((response) =>
        dispatch({
          type: GET_SCORES_FOR_USER_AND_PRODUCT,
          payload: response.data,
        })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function updateScore(value, userId, productId) {
  return function (dispatch) {
    axios
      .put(`/review/put`, {
        score: value,
        userId: userId,
        productId: productId,
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}
export function addScore(value, userId, productId) {
  return function (dispatch) {
    axios
      .post(`/review/add`, {
        score: value,
        userId: userId,
        productId: productId,
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}
export function getScoresForProduct(productId) {
  return function (dispatch) {
    axios
      .get(`/review/product/${productId}`)
      .then((response) =>
        dispatch({ type: GET_SCORES_FOR_PRODUCT, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}
export function getAllUsers(token) {
  return async function (dispatch) {
    await axios
      .get(`/user`, {
        headers: {
          auth_token: token,
        },
      })
      .then((response) =>
        dispatch({ type: GET_ALL_USERS, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}

export function modifyRolByAdmin(id, token) {
  return async function (dispatch) {
    await axios
      .get(`/user/rolmodify/${id}`, {
        headers: {
          auth_token: token,
        },
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
}


export function  searchLocalitation (info){
  return async function (dispatch){
    return dispatch ({type: SEARCH_LOCALITATION, payload: info})
  }
}

export function delete_location_search (info){
  return async function (dispatch){
    return dispatch ({type: DELETE_LOCATION_SEARCH, payload: info})
  }
}
export function search_ubication (id){
  console.log(id);
  return async function (dispatch){
    return dispatch ({type: SEARCH_UBICATION, payload: id})
  }
}
export const createUserCart = (id, cart) => {
  return async function (dispatch) {
    await axios
      .post(`/cart/${id}`, cart)
      .then(() => axios.get(`/cart/${id}`))
      .then((response) =>
        dispatch({ type: CREATE_USER_CART, payload: response.data[0] })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};
export const getUserCart = (id) => {
  return async function (dispatch) {
    await axios
      .get(`/cart/${id}`)
      .then((response) => {
        dispatch({ type: GET_USER_CART, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};
