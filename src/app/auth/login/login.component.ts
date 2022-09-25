import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadScriptService } from 'app/services/lazy-load-script.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formModel: FormGroup;

  constructor(private lazyLoadService: LazyLoadScriptService, private router: Router,private fb: FormBuilder,private auth: AuthService) { }

  ngOnInit() {
    // if (sessionStorage.getItem('id') != null) { // but must be != null
    //   this.router.navigateByUrl('/dashboard');
    // }
    this.formModel = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });

    this.lazyLoadService.loadScript('/assets/jquery.min.js').subscribe((_) => {
      console.log('Jquery is loaded!');
      this.loadJS();
    });
  }



  // onSubmit() {
  //     this.router.navigate(['dashboard']);
  // }

  onSubmit() {
    console.log('onSubmit')
    this.auth.login(this.formModel.value).subscribe(
      (res: any) => {
        if (res === 400 || res === null) {
          // this.toastr.error('Incorrect username or password.', 'Authentication failed.', { timeOut: 2222, });
          }
        console.log(res);
        localStorage.setItem('token', res.token);
       this.auth.setUserID(res.User_ID);
       this.auth.setUserRole(res.role);

       this.auth.setLoggedin(true);
      //  this.toastr.success('You have successfully logged in.', 'Authentication success.', {timeOut: 2222});
       this.auth.setUserType(res.type);

       let routes  = ["dummy", 'owner/dashboard','guest/dashboard','clerk/dashboard'];

       this.router.navigateByUrl(routes[this.auth.getUserRole]);



      },
      err => {
        if (err.status === 400 || err.status === null) {
          // this.toastr.error('Incorrect username or password.', 'Authentication failed.', { timeOut: 2222, });
        } else {
          console.log(err);
        }
      }
    );
  }

  register() {
    this.router.navigate(['register']);
}


loadJS() {
  $(".login-form").hide();
  $(".login").css("background", "none");

  $(".login").click(function(){
    $(".signup-form").hide();
    $(".login-form").show();
    $(".signup").css("background", "none");
    $(".login").css("background", "#fff");
  });

  $(".signup").click(function(){
    $(".signup-form").show();
    $(".login-form").hide();
    $(".login").css("background", "none");
    $(".signup").css("background", "#fff");
  });

  $(".btn").click(function(){
    $(".input").val("");
  });
}
}
