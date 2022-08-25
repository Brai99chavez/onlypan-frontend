import {
  GET_ALL_PRODUCTS,
  GET_BY_NAME,
  GET_FOR_ID,
  GET_TYPES,
  RESET_FILTERED_PRODUCTS,
} from '../Actions/Actions';

const inicialState = {
  products: [],
  types: [],
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
        products: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case RESET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: [],
      };
    case GET_FOR_ID:
      return {
        ...state,
        detailProduct: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
