import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;

  private token: string;
  private adminToken: string;
  private email: string;

  private active: boolean;
  private secretToken: string;
  private newPassword: string;
  private passwordToken: string;
  private emailresetpasssword: string;
  private tokenTimer: any;
  private userId: string;
  private password: string;
  //name
  private name: string;
  //role
  private role: string;
   private imagePath : string ;
  private isAdmin = false;
  private userID: string;

  private authStatusListener = new Subject<boolean>();
  private userUpdated = new Subject<{ user: AuthData; userCount: number }>();

  private users: any;
  private usersUpdated = new Subject<{ users: any }>();

  httpClient: any;

  constructor(private http: HttpClient, private router: Router) {}

  // get the name
  getName() {
    return localStorage.getItem('name');
  }
  getEmail() {
    return localStorage.getItem('email');
  }

  // get the role
  getRole() {
    return localStorage.getItem('role');
  }

  getImage(){
    return localStorage.getItem('imagePath');
  }

  // determine if the user is an admin (ines)
  getIsAdmin() {
    return this.isAdmin;
  }

  getAdminToken() {
    return this.adminToken;
  }
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, email: string, password: string, role: string, image: File) {
    const authData = new FormData();
    authData.append('name', name);
    authData.append('email', email );
    authData.append('password', password);
    authData.append('role', role);
    authData.append('image', image, name);
    console.log('image.name from authservices :' + image.name);

  //  const imagePath = image.name;
    // const authData: AuthData = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   role: role,
    //   imagePath: imagePath,
    // };

    this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(
      () => {
        // not verified page
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }
  //for the account verification.
  verify(seccccc: string) {
    this.secretToken = seccccc;
    this.http
      .get('http://localhost:3000/api/user/verify/' + this.secretToken)
      .subscribe(
        (response) => {
          // const secretToken = response.secretToken;
          // this.secretToken = secretToken ;
          response = this.secretToken;
          console.log(
            ' response auth from the front : ' +
              response +
              ' the secretToken from the front' +
              this.secretToken
          );
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }
  getUsersMadafaka(jobId: string) {
    this.http
      .get<{ message: string; users: any }>(
        'http://localhost:3000/api/user/getusers/'
      )

      .pipe(
        map((userData) => {
          console.log(userData);
          return {
            users: userData,
          };
        })
      )

      .subscribe((transformedJobData) => {
        this.users = transformedJobData.users;
        this.usersUpdated.next({
          users: [...this.users],
        });
      });
  }
  // the first id is the id of the job , the second parameter: user id
  valideJob(id: string, userId: string) {
    this.userID = userId;
    console.log('event id ' + id);

    this.http
      .post('http://localhost:3000/api/posts/adduser/' + id, {
        user: this.userID,
      })
      .subscribe(
        (response) => {
          // const secretToken = response.secretToken;
          // this.secretToken = secretToken ;
          console.log(' userID in the subscribe ! ' + this.userID);

          response = this.userID;
          console.log(
            'user Id from the front   ' +
              response +
              '  this.userID' +
              this.userID
          );
          // this.router.navigate(["/login"]);
        }
        ,
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }
  getUsersArray() {
    return this.users;
  }
  //for the reset password. , {password: this.password}
  resetpassword(seccccc: string, newPassword: string) {
    this.passwordToken = seccccc;
    this.newPassword = newPassword;
    this.http
      .put(
        'http://localhost:3000/api/user/resetpassword/' + this.passwordToken,
        { newPassword: this.newPassword }
      )
      .subscribe(
        (response) => {
          // const secretToken = response.secretToken;
          // this.secretToken = secretToken ;
          response = this.passwordToken;
          console.log(
            ' response auth from the front : ' +
              response +
              ' the secretToken from the front' +
              this.passwordToken
          );
          // this.router.navigate(["/login"]);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  // used to work but it didnt anymore
  // emailresetpassword(email: string) {
  //   this.emailresetpasssword = email;
  //   this.http
  //     .put("http://localhost:3000/api/user/reset", { email: this.emailresetpasssword });
  //       console.log(' response auth from the front : response the email from the front: ' + this.emailresetpasssword);
  //       this.router.navigate(["/login"]);

  // }

  // without redirecting to login (subscribe problem)
  emailresetpassword(email: string) {
    this.emailresetpasssword = email;
    this.http
      .put('http://localhost:3000/api/user/reset', {
        email: this.emailresetpasssword,
      })
      .subscribe(
        (response) => {
          // const secretToken = response.secretToken;
          // this.secretToken = secretToken ;
          response = this.emailresetpasssword;
          console.log(
            ' response auth from the front : ' +
              response +
              ' the email from the front' +
              this.emailresetpasssword
          );
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(name: string, email: string, password: string, role: string, imagePath: string ) {
    const authData: AuthData = {
      name: name,
      email: email,
      password: password,
      role: role,
      imagePath: imagePath,
    };
    this.http
      .post<{
        token: string;
        adminToken: string;
        expiresIn: number;
        userId: string;
        name: string;
        active: boolean;
        role: string;
        email: string;
        imagePath : string;
      }>('http://localhost:3000/api/user/login', authData)
      .subscribe(
        (response) => {
          const tokenn = response.token;
          const adminToken = response.adminToken;
          this.adminToken = adminToken;
          console.log('AdminToken from the front: ' + response.adminToken);

          // console.log("Token from the front: "+ response.token);
          console.log(this.token + 'Token from the front: ' + tokenn);

          // const active = response.active;
          // this.active= active ;
          this.email = email;
          // console.log('emailll: '+ this.email);
          this.name = name;

          this.token = tokenn;
          // const isActive = this.user.active ;
          // if (!this.active){
          //   this.router.navigate(["/verify"]);
          // }
          if (tokenn) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            //response
            this.name = response.name;
            this.role = response.role;
            this.email = response.email;
            this.imagePath = response.imagePath ;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            console.log('role ekher hsbdhjsabdjas '+  this.role);
            if (this.role === 'admin') {
              this.isAdmin = true;
              this.router.navigate(['/home/']);
              // this.router.navigate(['/showJob']);
            } else if (this.role === 'student') {
              this.router.navigate(['/home/']);
            }

            // ??? this.adminToken
            this.saveAuthData(
              tokenn,
              adminToken,
              expirationDate,
              this.userId,
              this.name,
              this.role,
              this.email,
              this.imagePath,
            );
            // chnage fazet router w kol
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const imagePath = localStorage.getItem('imagePath');

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {

      this.token = authInformation.token;
      this.adminToken = authInformation.adminToken;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      //
      this.email = authInformation.email;
      this.name = authInformation.name;
      this.role = authInformation.role;
      this.imagePath = authInformation.imagePath ;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      console.log('role trah autoauthuser' + this.role);
      if (this.role === 'admin') {
        this.isAdmin = true;
      }

    }
  }

  logout() {
    this.token = null;
    this.adminToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    //
    this.name = null;
    this.email = null;
    this.role = null;
    this.isAdmin = false;
    this.imagePath =null ;
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    adminToken: string,
    expirationDate: Date,
    userId: string,
    name: string,
    role: string,
    email: string,
    imagePath: string ,
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('adminToken', adminToken);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    localStorage.setItem('imagePath', imagePath);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('imagePath');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const imagePath = localStorage.getItem('imagePath');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      adminToken: adminToken,
      expirationDate: new Date(expirationDate),
      userId: userId,
      name: name,
      role: role,
      email: email,
      imagePath : imagePath ,
    };
  }
}
