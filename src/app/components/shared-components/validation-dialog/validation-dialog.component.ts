import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss']
})
export class ValidationDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: { msg: string }) {}

  onclickmadafaka( ){
      console.log(" Dialog works ");
      
  }

}
