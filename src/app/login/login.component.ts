import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RootReducer from '../reducers/index';
import { Observable } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  lang: string;

  constructor(private router: Router, private formBuilder:FormBuilder, private translate: TranslateService,
          private service: AuthService, private store:Store<RootReducer.State>) { 
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.store.select(RootReducer.getLang).subscribe(lang=>{
      this.lang = lang;
      this.translate.use(lang);
    });
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.service.authenticate(form)
        .subscribe(res=>{
          this.router.navigate(['/todos']);
        });
  }
  toggle(){

    if(this.lang === 'en') {
      this.store.dispatch({
        type:'CHANGE_LANG',
        payload: 'fr'
      });
    } else {
      this.store.dispatch({
        type:'CHANGE_LANG',
        payload: 'en'
      });
    }
    
  }



}
