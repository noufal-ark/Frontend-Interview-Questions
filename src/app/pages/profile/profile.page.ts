import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Labels } from 'src/app/constants/labels';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { LoaderService } from 'src/app/_service/loader.service';
import { Upload } from 'src/app/_models/upload';
import { UploadService } from 'src/app/_service/upload.service';
import Swal from 'sweetalert2';
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
  profileURL: string;

  currentUpload: Upload;

  @Input() editProf: string;
  selectedFile: File;

  constructor(
    public modalCtrl: ModalController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private navParams: NavParams,
    private uploadServ: UploadService
  ) {
    this.profileForm = this.formBuilder.group({
      profilepic: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.editProf = navParams.get('edit');
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  ngOnInit() {
    this.loadProfileData();
  }


  loadProfileData() {
    if (!this.editProf) {
      const storeValue = JSON.parse(localStorage.getItem('loginDetails'));
      console.log('storeValue : ', storeValue);

      if (storeValue) {
        this.profileURL = this.authService.setProfileImage(storeValue.profilepic);
        this.profileForm.patchValue(storeValue);
        this.profileForm.getRawValue();
      }
    } else {
      this.authService.profileRef().on('value', snapshot => {
        const snapVal = snapshot.val();
        console.log('snapVal : ', snapVal);
        this.profileURL = this.authService.setProfileImage(snapVal.profilepic);
        this.profileForm.patchValue(snapVal);
        this.profileForm.getRawValue();
      });
    }
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
    profDetail['profilepic'] = this.authService.checkProfileImage(profDetail['profilepic']);
    if (!this.authService.checkProfileImage(profDetail['profilepic'])) {
      delete profDetail.profilepic;
    }
    profDetail['profile_updated'] = true;
    profDetail['updated_on'] = new Date();

    console.log('profDetaile : ', profDetail);

    this.authService.profileRef().update(profDetail).finally(() => {

      Swal.fire({
        title: 'Success',
        text: 'Profile updated successfully!',
        // type: 'error',
        icon: 'success',
        confirmButtonText: 'Yes, delete it!'
      }).then(() => {
        this.close();
      });

    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log('selectedFile : ', this.selectedFile);
    this.onUpload();
  }

  onUpload() {
    // upload code goes here
    this.currentUpload = new Upload(this.selectedFile);
    this.uploadServ.pushUpload(this.currentUpload);

  }
}
