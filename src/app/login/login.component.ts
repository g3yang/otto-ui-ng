import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private router: Router, private formBuilder:FormBuilder, private service:UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.service.login(form)
        .subscribe(res=>{
          console.log(res);
          this.router.navigate(['/todos']);
        });
  }



}
