import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupService } from 'src/app/shared/services/signup.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';


//import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  form: FormGroup;
  showPassword: boolean = false;


  constructor(private router: Router,private formBuilder: FormBuilder, 
    private sign_up : SignupService, private auth: AuthServiceService) { 
    if (auth.get()){
      this.router.navigate(['/races']);
    } 
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]],
      confirm_password : ['',[Validators.required,Validators.minLength(4)]]
  },{
    validators:  [this.matchPasswords.bind(this)]
 });
}


  ngOnInit(): void {

  }
  toggleShowPassword(): void{
    this.showPassword = !this.showPassword;
  }

  sendData(){
    if(this.form.valid){
      const {username,email,password,confirm_password} = this.form.getRawValue();
      this.sign_up.Sign_up(username,email,password).subscribe( res => {
        console.log("Registrando nuevo usuario")
        console.log(res)
        //console.log(a)
        this.auth.save(res.token,email,res.username,"user")
        this.router.navigate(['/races']);
      });

    
    }
    //this.router.navigate(['/races']);

  }

  matchPasswords() {
    if(!this.form) return;
    const {password, confirm_password} = this.form.getRawValue()
    if( password == confirm_password){
      return null;
    }else{
      return {passwordMismatch:true}
    }
  }

}

