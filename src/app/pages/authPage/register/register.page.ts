import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
