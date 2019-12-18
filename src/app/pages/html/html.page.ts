import { Component, OnInit } from '@angular/core';
// import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-html',
  templateUrl: './html.page.html',
  styleUrls: ['./html.page.scss'],
})
export class HtmlPage implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

}
