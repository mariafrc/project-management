import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../components/dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog, public _snackBar: MatSnackBar) { }

  dialogBox(message: string, type: 'message' | 'warning' | 'alert'): Promise<boolean>{
    return new Promise((resolve)=>{
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '350px',
        data: {type, message}
      });

      dialogRef.afterClosed().subscribe((data)=>{
        resolve(data);
      });
    });
  }

	snackMessage(message: string, duration: number = 3000): void {
    this._snackBar.open(message, "ok", {
      duration: duration,
    });
  }
}
