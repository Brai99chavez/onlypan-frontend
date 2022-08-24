const inicialState = {
    Products: [],
    CopyProducts: [],
    detailProduct: {},
    favorites: [],
    loading: false,
    error: null,
};
  
 const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return {
              ...state,
              Products: action.payload,
              CopyProducts: action.payload,
              error: null,
              loading: false,
            };
    
        default:
            return state
    }
}

export default rootReducer;