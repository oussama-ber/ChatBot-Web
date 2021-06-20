import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string ;
name: any ;
role: string ;
image: string ;
email:string;


constructor(private authService: AuthService){}
ngOnInit(){

  this.userId = this.authService.getUserId();
  console.log(this.userId);

  this.name = this.authService.getName();
  console.log(this.name);

  this.role = this.authService.getRole();
  console.log(this.role);

  this.image= this.authService.getImage();
  console.log(this.image);
  this.email= this.authService.getEmail();
  console.log(this.email);



}
}
