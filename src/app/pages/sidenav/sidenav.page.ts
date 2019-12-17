import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LoaderService } from 'src/app/_service/loader.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'Home',
      url: 'dashboard'
    },
    {
      title: 'CSS',
      url: 'css'
    },
    {
      title: 'HTML',
      url: 'html'
    },
    {
      title: 'JavaScript',
      url: 'javascript'
    },
    {
      title: 'Bootstrap',
      url: 'bootstrap'
    },
    {
      title: 'Angular',
      url: 'angular'
    }
  ];

  profURL: string;
  profName: string;
  profEmail: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private loader: LoaderService,
    public modalCtrl: ModalController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = isNullOrUndefined(event.url) ? this.selectedPath : event.url;
    });
  }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.authService.profileRef().on('value', snapshot => {
      const snapVal = snapshot.val();
      console.log('snapVal : ', snapVal);

      this.profURL = this.authService.setProfileImage(snapVal.profilepic);
      this.profName = isNullOrUndefined(snapVal.firstname) ? 'Hi Dude' : 'Hi ' + snapVal.firstname;
      this.profEmail = snapVal.email;
    });
  }

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      componentProps: {
        edit: true
      }
    });
    return await modal.present();
  }

  logoutUser() {
    this.loader.present('Authenticating your credentials...');
    console.log('logout user');
    this.authService.SignOut();
    if (this.loader.isLoading) {
      this.loader.dismiss();
    }
  }
}
