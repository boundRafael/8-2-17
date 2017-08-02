import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ReportPage } from '../report/report';
import { ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the GalleryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
public photos: any;

public pics:any;
public base64Image : string;
  constructor(public loadingCtrl: LoadingController, public http: Http,private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController,public _DomSanitizationService: DomSanitizer) {
    // this.pic = this.navParams.data[0]
    this.initializePics();
  }
  

initializePics(){
  this.http.get("https://bound-app.herokuapp.com/pullPhotos").map(res => res.json()).subscribe(data => {
    this.pics = data.gallery;
    console.log(this.pics)
  })
}
deleteItem(pic){
  var index = this.pics.indexOf(pic);

    let confirm = this.alertCtrl.create({
      title: 'Delete this photo?',
      message: 'All deleted photos cannot be restored',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
             if(index > -1){
                this.pics.splice(index, 1);
                        var data = {
                          img: this.pics
                    }
                    console.log(data);
                    this.http.post("https://bound-app.herokuapp.com/deletePhoto", data).subscribe(function(){
                      console.log("success");
                    },function(err){
                      console.log(err)
                    });
              }
          }
        }
      ]
    });
    confirm.present();
  

}
showProfilePage() {
    this.navCtrl.push(ReportPage);

  this.ionViewDidLoad() ;{
    console.log('ionViewDidLoad GalleryPage');
  }

}
ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }
ngOnInit(){
  this.photos=[];

}




takePhoto(){
const options: CameraOptions = {
  quality: 50,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this
.camera
.getPicture(options)
.then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/jpeg;base64,' + imageData;
 this.photos.push(this.base64Image);
 this.photos.reverse();
}, (err) => {
  console.log(err);
 // Handle error
});
 
 }
// deletePhoto(index){

//   let confirm = this.alertCtrl.create({
//       title: 'Delete this photo?',
//       message: 'All deleted photos cannot be restored',
//       buttons: [
//         {
//           text: 'No',
//           handler: () => {
//             deleteItem(pic){
//           }
//         },
//         {
//           text: 'Yes',
//           handler: () => {
//            this.pics.splice(index, 1);
//           }
//         }
//       ]
//     });
//     confirm.present();
//   }
  
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'hi',
    duration: 9000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
//this.photos.splice(index, 1);

presentLoadingCustom() {
  let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
    duration: 5000
  });

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();
}





}