import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    ]),
  ],
})
export class LoginPage implements OnInit {
  isLoginwithEmail = false;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

  loginwithEmailToggle() {
    this.isLoginwithEmail = !this.isLoginwithEmail;
  }

  notMemebr() {
    this.navCtrl.navigateForward('/register');
  }

}
