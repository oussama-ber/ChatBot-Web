import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ValidationDialogComponent } from '../validation-dialog/validation-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false ;
  userIsAdmin= false ;
 private authListenerSubs: Subscription;
  constructor (private authService: AuthService , public dialog: MatDialog,  private router: Router){}

  ngOnInit() {
    this.userIsAdmin = this.authService.getIsAdmin();
    console.log(this.userIsAdmin);
     this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated ;
    });
  }

  onLogout(){

    let  state = "Logout";  
   let dialogRef =  this.dialog.open(ValidationDialogComponent,{data:{msg: "logout"}});
   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog reluts : ${result}`);
    console.log("the result " + result );
      if ((result == "true"  )&& (state =="Logout") ){
        this.authService.logout();
        this.router.navigate(['/home/']);
      }
  });
  }
  }



