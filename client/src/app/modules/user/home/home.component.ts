import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import * as ProductActions from '../../../store/product/product.actions';
import { Product } from '../../../store/product/product.reducer';
import { selectProducts, selectProductLoading } from '../../../store/product/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
	newProduct: string;
  constructor(private store: Store<AppState>) {
    this.products$ = store.pipe(select(selectProducts));
    this.loading$ = store.pipe(select(selectProductLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.HOME_PAGE_LOAD_PRODUCT());
  }

  onAdd(): void{
    this.store.dispatch(ProductActions.HOME_PAGE_ADD_PRODUCT({name: this.newProduct}));
    this.newProduct = "";
  }

  onDelete(id: string): void{
  	this.store.dispatch(ProductActions.HOME_PAGE_DELETE_PRODUCT({id}));
  }
}
