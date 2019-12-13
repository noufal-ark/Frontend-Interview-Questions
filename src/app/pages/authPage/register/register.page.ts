import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';

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

  isRegisterwithEmail = false;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  registerwithEmailToggle() {
    this.isRegisterwithEmail = !this.isRegisterwithEmail;
  }

  alreadyMember() {
    this.navCtrl.navigateRoot('/login');
  }

}
