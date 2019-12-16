import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helper/must-match.validator';
import { Labels } from 'src/app/constants/labels';
import { LoaderService } from 'src/app/_service/loader.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    ])
  ]
})
export class RegisterPage implements OnInit {
  errMsg = Labels.errorMsg;
  isRegisterwithEmail = false;
  regLoading = null;
  alertErrorMessage = null;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    public navCtrl: NavController,
    private ngAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registerwithEmailToggle() {
    this.isRegisterwithEmail = !this.isRegisterwithEmail;
  }

  alreadyMember() {
    this.navCtrl.navigateRoot('/login');
  }

  onSubmit() {
    this.loader.present('Connecting to server...');

    console.log('register form ', this.registerForm.value);
    this.submitted = true;
    this.alertErrorMessage = null;
    if (this.registerForm.invalid) {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
      return;
    }
    if (this.loader.isLoading) {
      this.loader.dismiss();
    }

    this.loader.present('Registering your credentials...');

    const registerParams = this.registerForm.value;
    this.registerEmailAndPassword(registerParams.email, registerParams.password);
  }

  registerEmailAndPassword(email, password) {
    this.ngAuth.auth.createUserWithEmailAndPassword(email, password).then(authResponse => {
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
