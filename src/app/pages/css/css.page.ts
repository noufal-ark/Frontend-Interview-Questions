import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/_service/loader.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
  selector: 'app-css',
  templateUrl: './css.page.html',
  styleUrls: ['./css.page.scss'],
})
export class CssPage implements OnInit {
  cssRefArray = [];

  constructor(
    private authService: AuthenticationService,
    private loadService: LoaderService
  ) { }

  ngOnInit() {
    this.loadcssInterviewQA();
  }

  loadcssInterviewQA() {
    this.loadService.present('Communicating with the server. Please wait...');
    this.authService.cssRef().once('value', snapshot => {
      const cssRefValue = snapshot.val();
      console.log('cssRefValue : ', cssRefValue);
      this.cssRefArray = this.authService.processRefintoArray(cssRefValue);
      console.log('this.cssRefArray : ', this.cssRefArray);
      if (this.loadService.isLoading) {
        this.loadService.dismiss();
      }
    });
  }

}
