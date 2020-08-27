import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface Product{
	_id: string
	name: string
}

export type State = {
	list: Product[],
	loading: boolean
};

export const initialState: State = {
  list: [],
	loading: false
};

export const reducer = createReducer(
  initialState,
  
  on(
    ProductActions.HOME_PAGE_LOAD_PRODUCT, 
    ProductActions.HOME_PAGE_ADD_PRODUCT,
    ProductActions.HOME_PAGE_DELETE_PRODUCT,

    (state) => ({
  	...state,
  	loading: true
  })),

  on(ProductActions.LOAD_PRODUCT_SUCCESS, (state, action) => ({
  	...state, 
  	list: action.products, 
  	loading: false
  }) ),

  on(ProductActions.ADD_PRODUCT_SUCCESS, (state, action) => ({
  	...state, 
  	list: state.list.concat(action.product),
  	loading: false
  }) ),
  
  on(ProductActions.DELETE_PRODUCT_SUCCESS, (state, action) => ({
  	...state, 
  	list: state.list.filter(p => p._id !== action.id),
  	loading: false
  }) ),

  on(
    ProductActions.DELETE_PRODUCT_FAIL,
    ProductActions.ADD_PRODUCT_FAIL, 
    ProductActions.LOAD_PRODUCT_FAIL,

    (state) => ({
  	...state, 
  	loading: false
  }) ),

);

