import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';

//for navigation
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

const materialModules = [
	MatFormFieldModule,
	MatInputModule,
	MatCardModule,
	MatButtonModule,
	MatIconModule,
	MatDialogModule,
	MatSnackBarModule,
	MatListModule,
	MatChipsModule,

	LayoutModule,
	MatToolbarModule,
	MatSidenavModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }