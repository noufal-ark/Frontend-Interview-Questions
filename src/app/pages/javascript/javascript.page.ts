import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { LoaderService } from 'src/app/_service/loader.service';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.page.html',
  styleUrls: ['./javascript.page.scss'],
})
export class JavascriptPage implements OnInit {
  javascriptRefArray = [];

  constructor(
    private authService: AuthenticationService,
    private loadService: LoaderService
  ) { }

  ngOnInit() {
    this.loadjavascriptInterviewQA();
  }

  loadjavascriptInterviewQA() {
    this.loadService.present('Communicating with the server. Please wait...');
    this.authService.javascriptRef().once('value', snapshot => {
      const javascriptRefValue = snapshot.val();
      console.log('javascriptRefValue : ', javascriptRefValue);
      this.javascriptRefArray = this.authService.processRefintoArray(javascriptRefValue);
      console.log('this.javascriptRefArray : ', this.javascriptRefArray);
      if (this.loadService.isLoading) {
        this.loadService.dismiss();
      }
    });
  }

}
