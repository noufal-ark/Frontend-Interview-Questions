import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Labels } from 'src/app/constants/labels';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { LoaderService } from 'src/app/_service/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  errMsg = Labels.errorMsg;
  profLoading = null;
  alertErrorMessage = null;

  profileForm: FormGroup;
  submitted = false;
  profileURL = 'assets/images/uidev_male.png';

  constructor(
    public modalCtrl: ModalController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService
  ) {
    this.profileForm = this.formBuilder.group({
      profilepic: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  ngOnInit() {
    const storeValue = JSON.parse(localStorage.getItem('loginDetails'));
    console.log('storeValue : ', storeValue);

    if (storeValue) {
      this.profileURL = storeValue.profilepic ? storeValue.profilepic : 'assets/images/uidev_male.png';
      this.profileForm.patchValue(storeValue);
    }
    this.profileForm.getRawValue();
  }


  onSubmit() {
    this.loader.present('Connecting to server...');

    console.log('profile form ', this.profileForm.value);
    this.submitted = true;
    this.alertErrorMessage = null;
    if (this.profileForm.invalid) {
      if (this.loader.isLoading) {
        this.loader.dismiss();
      }
      return;
    }
    if (this.loader.isLoading) {
      this.loader.dismiss();
    }

    this.loader.present('Registering your credentials...');

    const prof = this.profileForm.value;
    this.updateProfileDetails(prof);
  }

  updateProfileDetails(profDetail) {
    profDetail['profile_updated'] = true;
    profDetail['updated_on'] = new Date();

    console.log('profDetaile : ', profDetail);

    this.authService.profileRef().update(profDetail).finally(() => {
      this.close();
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
