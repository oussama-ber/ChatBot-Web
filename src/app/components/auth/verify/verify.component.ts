import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  isLoading = false;
   seccccc = "";
  constructor(private route: ActivatedRoute, public authService: AuthService){}


  ngOnInit(){
   this.routeSub = this.route.params.subscribe(params => {
    console.log("the secret token from the verify.component : "+params) //log the entire params object
    console.log("the secret token from the verify.component : "+params['secretToken']) //log the value of id
    this.seccccc = params['secretToken']
  });
    this.authService.verify( this.seccccc);
  }

  // onVerify(form : NgForm){
  //     console.log("form.value from the front (verify component): "+form.value);
  //     if (form.invalid){
  //       return;
  //     }
  //     this.isLoading=true;
  //     this.authService.verify();

  //     // .subscribe({
  //     //   next: res=>{ console.log('test')},
  //     //   error: err=> {console.log('fail !!! ')}
  //     // });

  // }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
