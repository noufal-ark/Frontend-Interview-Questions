import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {  map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  error: string;
  emailSent = false;
  //user instance
  user = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.email
      }
    })
  );


  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private router: Router
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
      .signInWithEmailAndPassword(user.email, user.password)
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
        console.log("user signed Out successfully");
        this.router.navigate(["/login"]);
      }).catch((err) => {
        console.log(err);
      })
  }

}
