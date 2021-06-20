import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../signup/mime-type.validator';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;
  imagePreview: string;
  private file : File ;
 private  imageName : string ;



  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({

      image: new FormControl(null, {
        validators: [Validators.required] ,  asyncValidators: [mimeType]
      })
      //, asyncValidators: [mimeType]
    });




  }
  // click listener
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file.name);
    this.imageName = file.name ;
    this.form.value.image

    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();


    console.log(file);
    console.log("this.form.value.image : "+ this.form.value.image.name);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      // console.log( "preview "+ this.imagePreview);
      // console.log("file.name" + file.name);


    };
    reader.readAsDataURL(file);
  }
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // console.log("the imagePath: " +  this.imagePreview )
    // console.log("the image: (toString)" + this.form.get("image").toString())
    // console.log("imagename. " + this.imageName);

    // console.log("onSignUp file  : " + this.form.value.image);
    // console.log("onSignUp file name : " + this.form.value.image.name);

    this.authService.createUser(form.value.name, form.value.email, form.value.password, 'student',   this.form.value.image);
    this.router.navigate['/login'];
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
