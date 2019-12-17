import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LoaderService } from 'src/app/_service/loader.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';

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

  profURL = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  profName = 'Noufal';
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private loader: LoaderService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = isNullOrUndefined(event.url) ? this.selectedPath : event.url;
    });
  }

  ngOnInit() {
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
