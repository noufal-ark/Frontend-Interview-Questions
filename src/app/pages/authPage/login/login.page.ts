import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('openClose', [
      transition('* => true', [
        style({
          transform: 'translateY(-30%)',
        }),
        animate(2000, style({
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

  logForm(form) {
    console.log(form.value);
  }

  loginwithEmailToggle() {
    this.isLoginwithEmail = !this.isLoginwithEmail;
  }

}
