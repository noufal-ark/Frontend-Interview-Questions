import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Upload } from '../_models/upload';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  basePath = '/profile';
  // uploadTask: firebase.storage.UploadTask;


  pushUpload(upload: Upload) {
    const uid = this.afAuth.auth.currentUser.uid;

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${uid}/myprofile`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload inprogress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload error
        console.log('error upload : ', error);
      },
      () => {
        console.log('uploadTask.snapshot  :', uploadTask.snapshot);
        uploadTask.snapshot.ref.getDownloadURL().then(urlsnap => {
          console.log('urlsnap : ', urlsnap);

          upload.url = urlsnap;
          upload.name = upload.file.name;
          this.saveFileData(upload);
        });
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    const uid = this.afAuth.auth.currentUser.uid;
    console.log('upload : ', upload);

    this.afDB.database.ref(`users/${uid}/profilepic`).set(upload.url);
  }
}
