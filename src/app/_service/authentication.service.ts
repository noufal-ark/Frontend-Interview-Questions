import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Labels } from '../constants/labels';
import { NavController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  profileURL = 'assets/images/uidev_male.png';

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
    public navCtrl: NavController,
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
    console.log('authResp : ', authResp);

    const res = authResp.additionalUserInfo;
    const savingDetails = {
      firstname: isNullOrUndefined(res.profile) ? null : res.profile.given_name,
      lastname: isNullOrUndefined(res.profile) ? null : res.profile.family_name,
      profilepic: isNullOrUndefined(res.profile) ? null : res.profile.picture,
      email: isNullOrUndefined(res.profile) ? authResp.user.email : res.profile.email,
      phone: isNullOrUndefined(res.profile) ? null : res.profile.phoneNumber,
      providerId: res.providerId
    };
    console.log('savingDetails : ', savingDetails);

    localStorage.setItem('loginDetails', JSON.stringify(savingDetails));
  }

  checkProfileImage(url) {
    return url !== this.profileURL ? url : null;
  }

  setProfileImage(url) {
    return isNullOrUndefined(url) ? this.profileURL : url;
  }

  htmlRef() {
    return this.afDB.database.ref('courses/html');
  }


  processHtmlRefintoArray(htmlRef) {
    const htmlArray = [];
    const lengthQA = Object.keys(htmlRef).length;
    for (let i = 1; i === lengthQA; i++) {
      htmlArray.push(htmlRef[`qa${1}`]);
    }
    return htmlArray;
  }
}
