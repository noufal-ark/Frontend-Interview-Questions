import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('Hi iám dashboard');
    // this.authService.profileRef().set(
    //   {
    //     firstName: 'Muhammed',
    //     lastName: 'Noufal',
    //     email: 'noufal.arg@gmail.com',
    //     phone: '+91 9995959746',
    //   }
    // );
    this.checkUSerExist();
  }

  checkUSerExist() {
    console.log('called checkUSerExist');

    this.authService.profileRef()
      // this.authService.profileRef().child('firstname')
      .once('value', snapshot => {
        console.log('checkUSerExist profile_updated key : ', snapshot.hasChild('profile_updated'));
        if (snapshot.hasChild('profile_updated')) {
          console.log('profile is updated');
        } else {
          console.log('profile is not yet started');
          this.presentModal();
        }
      });
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      backdropDismiss: true
    });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
