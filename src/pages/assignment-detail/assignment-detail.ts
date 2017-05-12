import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CreateStoryPage } from "../create-story-page/create-story-page";

/**
 * Generated class for the AssignmentDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-assignment-detail',
  templateUrl: 'assignment-detail.html',
  providers: [MediaCapture]
})
export class AssignmentDetailPage {

  assignment: any;
  base64Image: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mediaCapture: MediaCapture,
    private camera: Camera
    ) {
    this.assignment = navParams.get('assignment');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentDetail');
  }

  recordAudio(){
    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        console.log(data[0].fullPath);
        console.log(data[0].type);
        this.navCtrl.push(CreateStoryPage, {path: data[0].fullPath, format: data[0].type})
      },
      (err: CaptureError) => console.error(err)
    );
  }

  captureImage(){
    let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.navCtrl.push(CreateStoryPage, {path: imageData, format: "image/jpeg"})
    })
  }

  captureVideo(){
    this.mediaCapture.captureVideo().then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );
  }



}
