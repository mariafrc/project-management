//it is import as global store on app.module.ts but stay in this folder to respect app architecture
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromProduct from './product/product.reducer';
import * as fromUser from './user/user.reducer';

export interface AppState {
	[fromProduct.productFeatureKey]: fromProduct.State
	[fromUser.userFeatureKey]: fromUser.State
}

export const reducers: ActionReducerMap<AppState> = {
	[fromProduct.productFeatureKey]: fromProduct.reducer,	
	[fromUser.userFeatureKey]: fromUser.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
