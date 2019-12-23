import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { LoaderService } from 'src/app/_service/loader.service';

@Component({
  selector: 'app-html',
  templateUrl: './html.page.html',
  styleUrls: ['./html.page.scss'],
})
export class HtmlPage implements OnInit {
  htmlRefArray = [];

  constructor(
    private authService: AuthenticationService,
    private loadService: LoaderService
  ) { }

  ngOnInit() {
    this.loadHtmlInterviewQA();
  }

  loadHtmlInterviewQA() {
    this.loadService.present('Communicating with the server. Please wait...');
    this.authService.htmlRef().once('value', snapshot => {
      const htmlRefValue = snapshot.val();
      console.log('htmlRefValue : ', htmlRefValue);
      this.htmlRefArray = this.authService.processRefintoArray(htmlRefValue);
      console.log('this.htmlRefArray : ', this.htmlRefArray);
      if (this.loadService.isLoading) {
        this.loadService.dismiss();
      }
    });
  }

}
