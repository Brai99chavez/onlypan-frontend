import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_FOR_ID,
  GET_TYPES,
  MIXED_SORT,
  RESET_FILTERED_PRODUCTS,
  GET_USER_ORDERS,
  ERROR,
  LOADING,
  GET_SCORES_FOR_USER,
  GET_SCORES_FOR_USER_AND_PRODUCT,
  GET_SCORES_FOR_PRODUCT,
  GET_ALL_USERS,
  CLEAR_DETAIL_PRODUCT,
  SEARCH_LOCALITATION,
  DELETE_LOCATION_SEARCH, 
  SEARCH_UBICATION,
  CREATE_USER_CART,
  GET_USER_CART,
  DELETE_PRODUCT_IN_CART,
  CHANGE_AMOUNT_IN_CART,
  EMPTY_CART,
  GET_ALL_ORDERS,
} from '../Actions/Actions';

const inicialState = {
  products: [],
  types: [],
  getOneScore: 0,
  getScores: 0,
  getProductScores: 0,
  filteredProducts: [],
  detailProduct: {},
  favorites: [],
  cart: {},
  userOrders: [],
  loading: false,
  error: null,
  errorMessage: '',
  allUsers: [],
  orders:[],
  locations: [],
  ubicationUserDeliver: []
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

    case GET_PRODUCT_FOR_ID:
      return {
        ...state,
        error: null,
        loading: false,
        detailProduct: action.payload,
      };
    case MIXED_SORT:
      return {
        ...state,
        filteredProducts: action.payload,
        loading: false,
        error: null,
      };
    case RESET_FILTERED_PRODUCTS:
      return {
        ...state,
        error: null,
        loading: false,
        filteredProducts: [],
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
    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      };
    }
    case CLEAR_DETAIL_PRODUCT: {
      return {
        ...state,
        detailProduct: {},
      };
    }
    case CREATE_USER_CART:
    case GET_USER_CART:
    case DELETE_PRODUCT_IN_CART:
    case CHANGE_AMOUNT_IN_CART:
    case EMPTY_CART:
      return {
        ...state,
        cart: action.payload,
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
    case GET_ALL_ORDERS: {
      return {
        ...state,
        orders:action.payload
      }
    }
    case SEARCH_LOCALITATION:{
      return {
        ...state,
        locations: action.payload
      }
    }
    case DELETE_LOCATION_SEARCH: {
      return {
        ...state,
        locations: action.payload
      }
    }
    case SEARCH_UBICATION:{
      const copyLocation = [...state.locations]
      const ubicationUserSelected = copyLocation.filter(ubi => ubi.id === action.payload)
      
      return {
        ...state,
        ubicationUserDeliver: state.ubicationUserDeliver.concat(ubicationUserSelected)
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
