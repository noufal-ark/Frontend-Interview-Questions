import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {

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
    }
  ];

  selectedPath = '';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }


}
