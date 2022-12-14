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
export const SEARCH_LOCALITATION = 'SEARCH_LOCALITATION';
export const DELETE_LOCATION_SEARCH = 'DELETE_LOCATION_SEARCH';
export const SEARCH_UBICATION = 'SEARCH_UBICATION';
export const CREATE_USER_CART = 'CREATE_USER_CART';
export const GET_USER_CART = 'GET_USER_CART';
export const DELETE_PRODUCT_IN_CART = 'DELETE_PRODUCT_IN_CART';
export const CHANGE_AMOUNT_IN_CART = 'CHANGE_AMOUNT_IN_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_ALL_FAVORITES = 'GET_ALL_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

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
        dispatch({ type: GET_PRODUCT_BY_NAME, payload: 'me gusta el pan' });

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

      });
  };
}

export function resetFilteredProducts() {
  return { type: RESET_FILTERED_PRODUCTS };
}

export function createProduct(value, token) {
  return function (dispatch) {
    axios
      .post('/product', value, {
        headers: {
          auth_token: token,
        },
      })
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

export function searchLocalitation(info) {
  return async function (dispatch) {
    return dispatch({ type: SEARCH_LOCALITATION, payload: info });
  };
}

export function delete_location_search(info) {
  return async function (dispatch) {
    return dispatch({ type: DELETE_LOCATION_SEARCH, payload: info });
  };
}
export function search_ubication(id) {
  console.log(id);
  return async function (dispatch) {
    return dispatch({ type: SEARCH_UBICATION, payload: id });
  };
}
export const createUserCart = (id, cart, token) => {
  return async function (dispatch) {
    await axios
      .post(`/cart/${id}`, cart, {
        headers: {
          auth_token: token,
        },
      })
      .then(() =>
        axios.get(`/cart/${id}`, {
          headers: {
            auth_token: token,
          },
        })
      )
      .then((response) =>
        dispatch({ type: CREATE_USER_CART, payload: response.data[0] })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};
export const getUserCart = (id, token) => {
  return async function (dispatch) {
    await axios
      .get(`/cart/${id}`, {
        headers: {
          auth_token: token,
        },
      })
      .then((response) => {
        dispatch({ type: GET_USER_CART, payload: response.data[0] });
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};

export const deleteProductInCart = (id, productId, token) => {
  return async function (dispatch) {
    await axios
      .delete(
        `/cart/deletePro/${id}`,

        {
          headers: {
            auth_token: token,
          },
          data: { id: productId },
        }
      )
      .then(() =>
        axios.get(`/cart/${id}`, {
          headers: {
            auth_token: token,
          },
        })
      )
      .then((response) =>
        dispatch({ type: DELETE_PRODUCT_IN_CART, payload: response.data[0] })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};

export const changeAmountInCart = (id, product, token) => {
  return async function (dispatch) {
    await axios
      .put(`/cart/update/${id}`, product, {
        headers: {
          auth_token: token,
        },
      })
      .then(() =>
        axios.get(`/cart/${id}`, {
          headers: {
            auth_token: token,
          },
        })
      )
      .then((response) =>
        dispatch({ type: CHANGE_AMOUNT_IN_CART, payload: response.data[0] })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};

export const emptyCart = (id, token) => {
  return async function (dispatch) {
    await axios.delete(`/cart/delete/${id}`, {
      headers: {
        auth_token: token,
      },
    });
    await axios.post(`/cart/${id}`, [], {
      headers: {
        auth_token: token,
      },
    });
    await axios
      .get(`/cart/${id}`, {
        headers: {
          auth_token: token,
        },
      })
      .then((response) =>
        dispatch({ type: EMPTY_CART, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};

export function DisableUser(id, token) {
  return async function (dispatch) {
    await axios
      .get(`/user/delete/${id}`, {
        headers: {
          auth_token: token,
        },
      })
      .catch((error) => console.log(error));
  };
}

export function DeleteProduct(id, token) {
  return async function (dispatch) {
    await axios.get(`/product/delete/${id}`, {
        headers: {
          auth_token: token,
        },
      })
      .catch((error) => console.log(error));
  };
}

export function ModifyProductById(id, token, value) {
  return async function (dispatch) {
    await axios
      .put(`/product/update/${id}`, value, {
        headers: {
          auth_token: token,
        },
      })
      .catch((error) => console.log(error));
  };
}
export function getOrders(token) {
  return async function (dispatch) {
    axios
      .get(`/order`, { headers: { auth_token: token } })
      .then((response) =>
        dispatch({ type: GET_ALL_ORDERS, payload: response.data })
      )
      .catch((error) => console.log('error'));
  };
}
export function updateOrder(id, token) {
  console.log(id)
  console.log('----------------------')
  return async function (dispatch) {
    axios
      .get(`/order/update/${id}`, { headers: { auth_token: token } })
      .catch((error) => console.log('error'));
  };
}

export const getAllFavorites = (id) => {
  return async function (dispatch) {
    await axios
      .get(`/favorite/all/${id}`)
      .then((response) => {
        dispatch({
          type: GET_ALL_FAVORITES,
          payload: response.data.products || [],
        });
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};

export const addFavorite = (data) => {
  return async function (dispatch) {
    await axios.post(`/favorite`, data);
    await axios
      .get(`/favorite/all/${data.userId}`)
      .then((response) => {
        dispatch({ type: ADD_FAVORITE, payload: response.data.products || [] });
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};

export const deleteFavorite = (data) => {
  return async function (dispatch) {
    await axios.delete(`/favorite/delete/${data.userId}`, {
      data: { id: data.id },
    });
    await axios
      .get(`/favorite/all/${data.userId}`)
      .then((response) => {
        dispatch({
          type: DELETE_FAVORITE,
          payload: response.data.products || [],
        });
      })
      .catch((error) => {
        dispatch(handleError(error));
        console.error(error);
      });
  };
};
