import React, { useReducer } from 'react';
import axios from 'axios';

export const productsContext = React.createContext();

const INIT_STATE = {
    products: [],
    pages: 0,
    categories: [],
    oneProduct: null
};

function reducer(state=INIT_STATE, action) {
    switch(action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload.results,
                pages: Math.ceil(action.payload.count / 6)
            };
        case 'GET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'GET_ONE_PRODUCT':
            return { ...state, oneProduct: action.payload };
        default:
            return state;
    };
};

const API = 'http://34.173.115.25/api/v1';

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    async function getProducts() {
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            // config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization
                }
            };
            
            const url = `${API}/products${window.location.search}`;

            const res = await axios(url, config);

            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
        } catch(err) {
            console.log(err);
        };
    };

  return (
    <productsContext.Provider value={{
        products: state.products,
        pages: state.pages,
        categories: state.categories,
        oneProduct: state.oneProduct,

        getProducts
    }}>
        { children }
    </productsContext.Provider>
  )
}

export default ProductContextProvider