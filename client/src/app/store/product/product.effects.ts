import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, concatMap, mergeMap, exhaustMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Product} from './product.reducer';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(
        ProductActions.HOME_PAGE_LOAD_PRODUCT
      ),
      mergeMap(() =>
        this.http.get<Product[]>(`/product`).pipe(
          map((products: Product[]) => ProductActions.LOAD_PRODUCT_SUCCESS({ products })),
          catchError((error) => {
            console.log(error);
            return of( ProductActions.LOAD_PRODUCT_FAIL({error: "Une erreur s'est produite"}) );
          })
        )
      )
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      
      ofType(
        ProductActions.HOME_PAGE_ADD_PRODUCT
      ),
      exhaustMap(({name}) =>
        this.http.post<Product>(`/product`, {name}).pipe(
          map((product: Product) => ProductActions.ADD_PRODUCT_SUCCESS({ product })),
          catchError((error) => {
            console.log(error);
            return of( ProductActions.LOAD_PRODUCT_FAIL({error: "Une erreur s'est produite"}) );
          })
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      
      ofType(
        ProductActions.HOME_PAGE_DELETE_PRODUCT
      ),
      concatMap((action) =>
        this.http.delete<Product>(`/product/${action.id}`).pipe(
          map((product: Product) => ProductActions.DELETE_PRODUCT_SUCCESS({ id: product._id })),
          catchError((error) => {
            console.log(error);
            return of( ProductActions.LOAD_PRODUCT_FAIL({error: "Une erreur s'est produite"}) );
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

}
