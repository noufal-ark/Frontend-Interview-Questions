import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Labels } from 'src/app/constants/labels';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/_service/loader.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('openClose', [
      transition('* => true', [
        style({
          height: '100px',
          overflow: 'hidden',
          transform: 'translateY(-30%)',
        }),
        animate(2000, style({
          height: 'auto',
          overflow: 'hidden',
          transform: 'translateY(0%)',
        }))
      ]),
    ]),
  ],
})
export class LoginPage implements OnInit {
  isLoginwithEmail = false;
  errMsg = Labels.errorMsg;
  loginLoading = null;
  alertErrorMessage = null;

  loginForm: FormGroup;
  submitted = false;
  constructor(
    public navCtrl: NavController,
    private ngAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginwithEmailToggle() {
    this.isLoginwithEmail = !this.isLoginwithEmail;
  }


  onSubmit() {
    this.loader.present('Connecting to server...');

    console.log('register form ', this.loginForm.value);
    this.submitted = true;
    this.alertErrorMessage = null;
    if (this.loginForm.invalid) {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
      return;
    }
    if (this.loader.isLoading) {
      this.loader.dismiss();
    }

    this.loader.present('Authenticating your credentials...');

    const loginParams = this.loginForm.value;
    this.loginEmailAndPassword(loginParams.email, loginParams.password);
  }

  loginEmailAndPassword(email, password) {
    this.ngAuth.auth.signInWithEmailAndPassword(email, password).then(authResponse => {
      console.log('authResponse : ', authResponse);
    }).catch(async errorResponse => {
      console.log('authResponse : ', errorResponse);
      this.alertErrorMessage = errorResponse.message;
    }).finally(() => {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
    });
  }

  notMemebr() {
    this.navCtrl.navigateForward('/register');
  }

  signWithGoogle() {
    this.alertErrorMessage = null;
    this.loader.present('Connecting to server...');
    // this.loader.present('Authenticating your credentials...');
    this.ngAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(authResponse => {
      console.log('authResponse : ', authResponse);
    }).catch(async errorResponse => {
      console.log('authResponse : ', errorResponse);
      this.alertErrorMessage = errorResponse.message;
    }).finally(() => {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
    });
  }


  signWithFacebook() {
    this.alertErrorMessage = null;
    this.loader.present('Connecting to server...');
    // this.loader.present('Authenticating your credentials...');
    this.ngAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(authResponse => {
      console.log('authResponse : ', authResponse);
    }).catch(async errorResponse => {
      console.log('authResponse : ', errorResponse);
      this.alertErrorMessage = errorResponse.message;
    }).finally(() => {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
    });
  }

}
