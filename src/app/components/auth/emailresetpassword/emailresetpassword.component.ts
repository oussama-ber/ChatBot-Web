import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emailresetpassword',
  templateUrl: './emailresetpassword.component.html',
  styleUrls: ['./emailresetpassword.component.scss']
})
export class EmailresetpasswordComponent implements OnDestroy, OnInit {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private route: ActivatedRoute, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onVerify(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.authService.emailresetpassword(form.value.email);
    this.router.navigate(["/reset"]);


  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
