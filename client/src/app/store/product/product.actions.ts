import { createAction, props } from '@ngrx/store';
import {Product} from './product.reducer';

export const HOME_PAGE_LOAD_PRODUCT = createAction(
  '[Home Page] Load Products'
);

export const LOAD_PRODUCT_SUCCESS = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);

export const LOAD_PRODUCT_FAIL = createAction(
  '[Product API] Load Products Fail',
  props<{ error: string }>()
);

export const HOME_PAGE_ADD_PRODUCT = createAction(
  '[Home Page] Add Product',
  props<{ name: string }>()
);

export const ADD_PRODUCT_SUCCESS = createAction(
  '[Product API] Add Product Success',
  props<{ product: Product }>()
);

export const ADD_PRODUCT_FAIL = createAction(
  '[Product API] Add Product Fail',
  props<{ error: string }>()
);


export const HOME_PAGE_DELETE_PRODUCT = createAction(
  '[Home Page] Delete Product',
  props<{ id: string }>()
);

export const DELETE_PRODUCT_SUCCESS = createAction(
  '[Product API] Delete Product Success',
  props<{ id: string }>()
);

export const DELETE_PRODUCT_FAIL = createAction(
  '[Product API] Delete Product Fail',
  props<{ error: string }>()
);