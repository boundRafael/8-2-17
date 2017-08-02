import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
today

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    let date = new Date();
    this.today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Report Sent',
      subTitle: 'A local animal control is on the way',
      buttons: ['OK']
    });
    alert.present();
  }
  
}
