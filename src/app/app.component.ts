import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular7-crud';
  constructor(private translate: TranslateService) {
   
  }

  ngOnInit(){
     // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

  
  }

  changeLang(){
    const currLang = this.translate.currentLang;
    if (currLang == 'fr'){
      this.translate.use('en');
    }else{
      this.translate.use('fr');
    }    
  }

  getToLang(){
    const currLang = this.translate.currentLang;
    if(currLang ==='en'){
      return 'FR';
    }else{
      return 'EN';
    }
  }


}
