import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { LoaderService } from 'src/app/_service/loader.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.page.html',
  styleUrls: ['./angular.page.scss'],
})
export class AngularPage implements OnInit {
  angularRefArray = [];

  constructor(
    private authService: AuthenticationService,
    private loadService: LoaderService
  ) { }

  ngOnInit() {
    this.loadangularInterviewQA();
  }

  loadangularInterviewQA() {
    this.loadService.present('Communicating with the server. Please wait...');
    this.authService.angularRef().once('value', snapshot => {
      const angularRefValue = snapshot.val();
      console.log('angularRefValue : ', angularRefValue);
      this.angularRefArray = this.authService.processRefintoArray(angularRefValue);
      console.log('this.angularRefArray : ', this.angularRefArray);
      if (this.loadService.isLoading) {
        this.loadService.dismiss();
      }
    });
  }

}
