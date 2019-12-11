import { Component, OnInit } from '@angular/core';
// import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  todo = {
    title: '',
    description: ''
  };

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

  logForm(form) {
    console.log(form.value);
  }

}
