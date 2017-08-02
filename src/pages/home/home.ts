import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { GalleryPage } from '../gallery/gallery';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any;
  public base64Image: string;
  constructor(public navCtrl: NavController,  public http: Http, public platform: Platform, public googleMaps: GoogleMaps, private geolocation: Geolocation, private camera: Camera, private alertCtrl: AlertController, public navParams: NavParams, public transfer: FileTransfer, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      this.loadMap();
    });
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
}

  showProfilePage() {
    this.navCtrl.push(GalleryPage);
  }
  //Upload Image 
  fileTransfer: FileTransferObject = this.transfer.create();

  uploadImg() {
    console.log("upload img ran: ")
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'FBBR.png',
      headers: {}
    }

    this.fileTransfer.upload('/assets/', 'http://localhost:8080/animalImage', options)
      .then((data) => {
        // success
        console.log("yes")
      }, (err) => {
        // error
        console.log("no")
      })

  }

  loadMap() {
    console.log("loading map");
    this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude
      resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      
    });

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker

        // create LatLng object

        let ionic2: LatLng = new LatLng(34.022042, -118.273154);
        let ionic3: LatLng = new LatLng(34.039685, -118.294463);
        let ionic4: LatLng = new LatLng(33.974903, -118.352178);
        let ionic5: LatLng = new LatLng(33.892293, -118.279765);
        let ionic6: LatLng = new LatLng(33.925040, -118.168584);
        let ionic7: LatLng = new LatLng(33.915073, -118.334868);
        let ionic8: LatLng = new LatLng(34.042062, -118.308336);
        // create CameraPosition
        let position: CameraPosition = {
          target: ionic3,
          zoom: 10,
        };

        // move the map's camera to position
        map.moveCamera(position);

        // create new marker
        
        let markerOptions2: MarkerOptions = {
          position: ionic2,
          title: '3030 Hill St, Los Angeles, CA 90007'
        };
        
        let place2 = "Fur Baby Rescue: Provides a temporary, safe home for cats, kittens, dogs, and puppies until they are adopted.";
        let markerOptions3: MarkerOptions = {
          position: ionic3,
          title: '1692 W Washington Blvd, Los Angeles, CA 90007'
        };
        let place3 = "Washington Dog and Cat Hospital: Committed to their clients through continuing education, technological advances in veterinary medicine and service.";
        let markerOptions4: MarkerOptions = {
          position: ionic4,
          title: '721 Centinela Ave, Inglewood, CA 90302'
        };
        let place4 = "Centinela Animal Hospital: Their purpose is to bring you useful information which can be used to improve animal and human health.";
        let markerOptions5: MarkerOptions = {
          position: ionic5,
          title: '328 W Redondo Beach Blvd, Gardena, CA 90248'
        };
        let place5 = "Pet Harbor: They help the animals benefit by providing mechanisms for them to be adopted if they are available or found if they are lost."
        let markerOptions6: MarkerOptions = {
          position: ionic6,
          title: '11258 Garfield Ave, Downey, CA 90242'
        };
        let place6 = "Los Angeles County Animal Shelter: Provides services such as picking up a stray animal(s) and medical resources for the animal.";
        let markerOptions7: MarkerOptions = {
          position: ionic7,
          title: '12910 Yukon Ave, Hawthorne, CA 90250'
        };
        let place7 = "Society for the Prevention of Cruelty to Animals Los Angeles (spcaLA): An independent, nonprofit animal welfare organization serving Southern California.";
        let markerOptions8: MarkerOptions = {
          position: ionic8,
          title: '1726 S Western Ave, Los Angeles, CA 90006'
        };
        let place8 = "Western Animal Hospital: Provide a wide variety of professional veterinary services to help animals in need.";

            map.addMarker(markerOptions2)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place2);})
            });

            map.addMarker(markerOptions3)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place3);})
            });

            map.addMarker(markerOptions4)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place4);})
            });

            map.addMarker(markerOptions5)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place5);})
            });

            map.addMarker(markerOptions6)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place6);})
            });

            map.addMarker(markerOptions7)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place7);})
            });

            map.addMarker(markerOptions8)
              .then((marker: Marker) => {
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(
                      () => {this.showToast(place8);})
            });
    })

  }      

  showToast(mapText){
    let toast = this.toastCtrl.create({
      message: mapText,
      //duration: 6000,
      showCloseButton: true,
      closeButtonText: "Ok",
      dismissOnPageChange: true
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
    // this.uploadImg();
  }
  ngOnInit() {
    this.photos = [];
  }

  takePhoto() {
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
        var data = {
          img: this.base64Image
        }
        console.log(data);
        
        this.http.post("https://bound-app.herokuapp.com/saveImage", data).subscribe(function(){
          console.log("success");
          this.navCtrl.push(GalleryPage);
        },function(err){
          console.log(err)
        });

        


      }, (err) => {
        console.log(err);
        // Handle error
      });

  }
  deletePhoto(index) {

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
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }
  //this.photos.splice(index, 1);
}