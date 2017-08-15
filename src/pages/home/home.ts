import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { TutorialPage } from '../tutorial/tutorial';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
    cards:any;
    clicked:string;
    constructor(public navCtrl: NavController,public http:Http,public navParams:NavParams,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
        
      this.presentLoading();
      if(this.navParams.get('data'))
        {
          
          this.cards = this.navParams.get('data');
        }
        else
          {
            this.homepageData();
          }
        
  }

  homepageData()
  {
    this.http.get("https://tecshila.com/php/HomePage.php").map(res => res.json()).subscribe(data=>{
            this.cards = data;
        }
      , e => {
              this.showAlert();
              this.clicked="";
          });
  }    

    presentLoading() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000,
        dismissOnPageChange: true
      });
      loader.present();
    }
    
    showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Error Loading!',
        subTitle: 'Apologies, please try again soon with mobile network.',
        buttons: [
          {
            text:'Try Again',
            role:'again',
            handler:data => {
              if(this.clicked=="")
                {
                  this.homepageData();
                }
                else
                {
                  this.navigate(this.clicked);
                }
            }
          }]
      });
      alert.present();
    }
      
      navigate(url) {
        this.presentLoading();
        this.http.post('https://tecshila.com/php/NavigatePages.php', {url:url})
          .map(res => res.json())
          .subscribe(data => {
            if(data.item=="home")
            {
              this.navCtrl.push(HomePage,{'data':data.array});
            }
            else if(data.item=="tutorial")
            {
              this.navCtrl.push(TutorialPage,{'data':data.array});
            }
            },
        e => {
          this.showAlert();
          this.clicked=url;
        });
          }
      }
    




