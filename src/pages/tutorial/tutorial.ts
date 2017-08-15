import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the TutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  cards : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.cards = this.navParams.get('data');
    for(let i=0;i<this.cards.para.length;i++)
      {
        if(this.cards.para[i].item=="code")
          {
            this.cards.para[i].code = atob(this.cards.para[i].code);
          }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
