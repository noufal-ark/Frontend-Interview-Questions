import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  countArray: [];

  constructor(
    private authService: AuthenticationService,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    console.log('Hi iám dashboard');
    this.checkUSerExist();
    this.loadTotalQuestionCount();
  }

  checkUSerExist() {
    console.log('called checkUSerExist');

    this.authService.profileRef()
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
      componentProps: {
        edit: false
      }
    });
    return await modal.present();
  }

  navTo(path) {
    console.log('path : ', path);
    this.navCtrl.navigateForward(['menu/' + path]);
  }

  loadTotalQuestionCount() {
    this.authService.coursesRef().once('value', countSnap => {
      const valSnap = countSnap.val();
      this.countArray = [];
      Object.keys(valSnap).forEach(element => {
        const countCourses = Object.keys(valSnap[element]).length;
        const nameCourses = element;
        console.log(element, countCourses);
        this.countArray[nameCourses] = countCourses;
      });
      console.log('this.countArray : ', this.countArray);

      return this.countArray;
    });


  }
}
