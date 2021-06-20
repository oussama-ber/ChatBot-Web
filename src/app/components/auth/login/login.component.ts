import {Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(form : NgForm){
      console.log(form.value);
      if (form.invalid){
        return;
      }
      this.isLoading=true;
      this.authService.login(form.value.name, form.value.email, form.value.password, this.authService.getRole(), this.authService.getImage() );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
