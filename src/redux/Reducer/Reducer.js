import {
  FILTER_BY_TYPE,
  SORT_BY_PRICE,
  MIXED_SORT,
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_FOR_ID,
  GET_TYPES,
  RESET_FILTERED_PRODUCTS,
  ERROR,
  LOADING,
  SIGN_IN,
  SIGN_UP,
  GET_SCORES_FOR_USER,
  GET_SCORES_FOR_USER_AND_PRODUCT,
  GET_SCORES_FOR_PRODUCT,
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
  loading: false,
  error: null,
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
    case GET_BY_NAME:
      return {
        ...state,
        loading: false,
        error: null,
        filteredProducts: action.payload,
      };
    case RESET_FILTERED_PRODUCTS:
      return {
        ...state,
        error: null,
        loading: false,
        filteredProducts: [],
      };
    case GET_FOR_ID:
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
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN: {
      return {
        ...state,
        loading: false,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        loading: false,
      };
    }
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
    
    default:
      return state;
  }
};

export default rootReducer;
