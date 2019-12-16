import { Component, OnInit } from '@angular/core';
import { Labels } from 'src/app/constants/labels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoaderService } from 'src/app/_service/loader.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  errMsg = Labels.errorMsg;
  isRegisterwithEmail = false;
  regLoading = null;
  alertErrorMessage = null;
  alertSuccessMessage = null;

  forgotForm: FormGroup;
  submitted = false;

  constructor(
    public navCtrl: NavController,
    private ngAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }

  alreadyMember() {
    this.navCtrl.navigateRoot('/login');
  }

  notMemebr() {
    this.navCtrl.navigateForward('/register');
  }

  onSubmit() {
    this.loader.present('Connecting to server...');

    console.log('forgotForm form ', this.forgotForm.value);
    this.submitted = true;
    this.alertSuccessMessage = null;
    this.alertErrorMessage = null;
    if (this.forgotForm.invalid) {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
      return;
    }
    if (this.loader.isLoading) {
      this.loader.dismiss();
    }

    this.loader.present('Resetting your credentials...');

    const forgotParams = this.forgotForm.value;
    this.resetEmail(forgotParams.email);
  }

  resetEmail(email) {
    this.ngAuth.auth.sendPasswordResetEmail(email).then(authResponse => {
      console.log('authResponse : ', authResponse);
      this.alertSuccessMessage = Labels.forgotMsg.validEmail + email + Labels.forgotMsg.validEmail2;

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
