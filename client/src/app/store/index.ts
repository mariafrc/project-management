//it is import as global store on app.module.ts but stay in this folder to respect app architecture
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth/auth.reducer';

export interface State {
	[fromAuth.authFeatureKey]: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
	[fromAuth.authFeatureKey]: fromAuth.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
