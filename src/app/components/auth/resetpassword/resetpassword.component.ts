import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnDestroy {
  private routeSub: Subscription;

  isLoading = false;
  seccccc = '';
  private match = false;
  constructor(private route: ActivatedRoute, public authService: AuthService) { }

  onVerify(form: NgForm) {
    this.routeSub = this.route.params.subscribe(params => {
      console.log('the passwordToken from the ResetpasswordComponent : ' + params);  // log the entire params object
      console.log('the passwordToken from the ResetpasswordComponent : ' + params['passwordToken']); //log the value of id
      this.seccccc = params['passwordToken'];
      if (form.value.newPassword == form.value.confirmedPassword) {
        this.match = true;
      }
    });
    console.log(form.value);
    if (form.invalid || !this.match) {
      return;
    }
    this.isLoading = true;
    this.authService.resetpassword(this.seccccc, form.value.newPassword);
  }


  // ngOnInit(): void {
  //   this.routeSub = this.route.params.subscribe(params => {
  //     console.log("the passwordToken from the ResetpasswordComponent : "+params) //log the entire params object
  //     console.log("the passwordToken from the ResetpasswordComponent : "+params['passwordToken']) //log the value of id
  //     this.seccccc = params['passwordToken']
  //   });
  //     this.authService.resetpassword( this.seccccc);
  // }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
