import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Labels } from '../constants/labels';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  error: string;
  emailSent = false;
  user = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.email;
      }
    })
  );


  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    public navCtrl: NavController
  ) { }
  /* Sign up */
  signUpRegular(user) {
    console.log('signup user  ==> ', user);

    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(user.email, user.password);
  }

  /* Sign in */
  signInRegular(user) {
    console.log('SignIn user  ==> ', user);

    return this.afAuth
      .auth
      .signInWithEmailAndPassword(user.email, user.password);
  }

  GoogleProvider() {
    console.log('GoogleProvider ..........');

    return new auth.GoogleAuthProvider();
  }
  FacebookProvider() {
    console.log('FacebookProvider ..........');
    return new auth.FacebookAuthProvider();
  }

  /* Sign in with popup */
  signInWithPopup(provider) {
    if (provider === 'google') {
      return this.afAuth.auth.signInWithPopup(this.GoogleProvider());
    } else {
      return this.afAuth.auth.signInWithPopup(this.FacebookProvider());
    }
  }

  /* Sign out */
  SignOut() {
    this.afAuth
      .auth
      .signOut()
      .then(() => {
        console.log(Labels.authMsg.signout);
        this.navCtrl.navigateRoot(['/login']);
      }).catch((err) => {
        console.log(err);
      });
  }

  sendResetEmail(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  profileRef() {
    const uid = this.afAuth.auth.currentUser.uid;
    console.log('uid : ', uid);
    // return this.afDB.object(`users/${uid}`);
    return this.afDB.database.ref(`users/${uid}`);
  }

  storeIntoLocal(authResp) {
    const res = authResp.additionalUserInfo;
    const savingDetails = {
      firstname: res.profile.given_name,
      lastname: res.profile.family_name,
      profilepic: res.profile.picture,
      email: res.profile.email,
      phone: res.profile.phoneNumber,
      providerId: res.profile.providerId
    };
    console.log('savingDetails : ', savingDetails);

    localStorage.setItem('loginDetails', JSON.stringify(savingDetails));
  }
}
