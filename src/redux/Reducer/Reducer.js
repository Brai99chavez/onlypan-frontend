import {
  FILTER_BY_TYPE,
  SORT_BY_PRICE,
  MIXED_SORT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_FOR_ID,
  GET_TYPES,
  RESET_FILTERED_PRODUCTS,
  GET_USER_ORDERS,
  ERROR,
  LOADING,
  GET_SCORES_FOR_USER,
  GET_SCORES_FOR_USER_AND_PRODUCT,
  GET_SCORES_FOR_PRODUCT,
  GET_ALL_USERS,
  CLEAR_DETAIL_PRODUCT,
  GET_ALL_ORDERS,
} from "../Actions/Actions";

const inicialState = {
  products: [],
  types: [],
  getOneScore: 0,
  getScores: 0,
  getProductScores: 0,
  filteredProducts: [],
  detailProduct: {},
  favorites: [],
  userOrders: [],
  loading: false,
  error: null,
  errorMessage: '',
  allUsers: [],
  orders:[],
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        error: null,
        loading: false,
        filteredProducts: [],
        products: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        loading: false,
        error: null,
        types: action.payload,
      };
    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        loading: false,
        error: null,
        filteredProducts: action.payload,
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        error: null,
        loading: false,
        userOrders: action.payload,
      };
    case RESET_FILTERED_PRODUCTS:
      return {
        ...state,
        error: null,
        loading: false,
        filteredProducts: [],
      };
    case GET_PRODUCT_FOR_ID:
      return {
        ...state,
        error: null,
        loading: false,
        detailProduct: action.payload,
      };

    case FILTER_BY_TYPE:
      return {
        ...state,
        filteredProducts: action.payload,
        loading: false,
        error: null,
      };
    case SORT_BY_PRICE:
      return {
        ...state,
        filteredProducts: action.payload,
        loading: false,
        error: null,
      };
    case MIXED_SORT:
      return {
        ...state,
        filteredProducts: action.payload,
        loading: false,
        error: null,
      };

    case ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.error,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SCORES_FOR_USER: {
      return {
        ...state,
        getScores: action.payload,
      };
    }
    case GET_SCORES_FOR_USER_AND_PRODUCT: {
      return {
        ...state,
        getOneScore: action.payload.length ? action.payload[0].score : 0,
      };
    }
    case GET_SCORES_FOR_PRODUCT: {
      return {
        ...state,
        getProductScores: action.payload,
      };
    }
    case GET_ALL_USERS:{
      return {
        ...state,
        allUsers: action.payload,
      }
    }
    case CLEAR_DETAIL_PRODUCT: {
      return {
        ...state,
        detailProduct: {}
      }
    }
    case GET_ALL_ORDERS: {
      return {
        ...state,
        orders:action.payload
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
