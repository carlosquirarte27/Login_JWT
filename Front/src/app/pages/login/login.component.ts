import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/shared/services/login.service';
import { Login } from 'src/app/shared/services/interfaces/login';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { SocialAuthService, GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  email: string = '';
  password: string = '';
  constructor(private loginService:LoginService, private router:Router, private authService :AuthServiceService, private socialAuth: SocialAuthService) {
    if (authService.get()){
      this.router.navigate(['/races']);
    } 
  }

  ngOnInit(): void {
    this.socialAuth.authState.subscribe((user) => {
      console.log(user)
      this.authService.save(user.idToken,user.email,user.name,'user')
      this.loginService.validateGoogleLogIn(this.authService.get()).subscribe(res => {
        console.log(res);
      })
      
      //this.loggedIn = (user != null);
    });
  }

  login(): void{
    this.loginService.DBLogIn(this.email,this.password).subscribe( res => {
        console.log("iniciando sesion")
        console.log(res.data.user)
        this.authService.save(res.data.user.token,this.email,res.data.user.username,res.data.user.level)
        console.log("Flujo chafa")
        this.router.navigate(['/logeado']);
      });

    }
    googleLogIn(){
      this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(a =>{
        this.router.navigate(['/races']);
      });

    }
    validateLogIn(){

    }
}


