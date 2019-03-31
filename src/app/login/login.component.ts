import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private router: Router, private formBuilder:FormBuilder, private service: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.service.authenticate(form)
        .subscribe(res=>{
          this.router.navigate(['/todos']);
        });
  }



}
