import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { LoaderService } from 'src/app/_service/loader.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.page.html',
  styleUrls: ['./bootstrap.page.scss'],
})
export class BootstrapPage implements OnInit {
  bootstrapRefArray = [];

  constructor(
    private authService: AuthenticationService,
    private loadService: LoaderService
  ) { }

  ngOnInit() {
    this.loadbootstrapInterviewQA();
  }

  loadbootstrapInterviewQA() {
    this.loadService.present('Communicating with the server. Please wait...');
    this.authService.bootstrapRef().once('value', snapshot => {
      const bootstrapRefValue = snapshot.val();
      console.log('bootstrapRefValue : ', bootstrapRefValue);
      this.bootstrapRefArray = this.authService.processRefintoArray(bootstrapRefValue);
      console.log('this.bootstrapRefArray : ', this.bootstrapRefArray);
      if (this.loadService.isLoading) {
        this.loadService.dismiss();
      }
    });
  }

}
