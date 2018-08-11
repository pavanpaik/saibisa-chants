import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController , Platform} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { MusicService } from '../../providers/musicservice';
import {TranslateService} from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { About } from '../about/about'
import {Login} from '../login/login'
//By Rekar Dilzar Rashid Botany +9647504051800
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
  tabBarElement:any;
  actions:any;
  opened:boolean=false;

  constructor(public storage: Storage,public platform: Platform, public actionSheetCtrl: ActionSheetController, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams,public _auth:AuthService,public musicservice : MusicService) {
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
this.tabBarElement.style.display = 'none';


platform.ready().then(() => {
       platform.registerBackButtonAction(() => {
              if(this.opened){
                this.opened=false;  
setTimeout(() => {
   this.actions.dismiss();
}, 100);         }
            else if(this.navCtrl.canGoBack()){
              this.navCtrl.pop();
            }
           
          });
    });

 }

setLang(lang) {
this.translate.use(lang);
        this.translate.setDefaultLang(lang);


  this.storage.set('lang', lang);
}


  langs() {
    this.actions = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'English',
          handler: () => {
            this.opened = false;
            this.setLang('en');
          }
        },
        {
          text: 'मराठी',
          handler: () => {
            this.opened = false;
            this.setLang('mr');
          }
        },
        {
          text: 'हिंदी',
          handler: () => {
            this.opened = false;
            this.setLang('hi');
          }
        },
        {
          text: 'ಕನ್ನಡ',
          handler: () => {
            this.opened = false;
            this.setLang('kn');
          }
        },
        {
          text: 'தமிழ்',
          handler: () => {
            this.opened = false;
            this.setLang('ta');
          }
        },
        {
          text: 'తెలుగు',
          handler: () => {
            this.opened = false;
            this.setLang('te');
          }
        }
      ]
    });

   this.actions.present();
   this.opened=true;
 }








  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

     ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';}


     ionViewWillEnter() {
     this.tabBarElement.style.display = 'none';}

  logout(){

    this.musicservice.pause();

  setTimeout(() => {
  this._auth.signOut();

  this.navCtrl.push(Login);
}, 500); 
}





followfb() {
  window.open('https://www.facebook.com/DiJaanJayaWahi/','_system');
}

followig() {
  window.open('https://www.instagram.com/','_system');
}

contact() {

window.open(`mailto:saibabaisstillalive@gmail.com`, '_system');
}

about() {
this.navCtrl.push(About);
}
}
