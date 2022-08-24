import {GET_ALL_PRODUCTS,GET_BY_NAME,RESET_FILTERED_PRODUCTS} from "../Actions/Actions"

const inicialState = {
    products: [],
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
        case GET_BY_NAME:
            return {
                ...state,
                filteredProducts: action.payload
            }
        case RESET_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: '',
            }
        default:
            return state
    }
}

export default rootReducer;