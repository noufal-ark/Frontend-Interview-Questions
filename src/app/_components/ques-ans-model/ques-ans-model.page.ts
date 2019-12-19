import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-answer-model',
  templateUrl: './ques-ans-model.page.html',
  styleUrls: ['./ques-ans-model.page.scss'],
})
export class QuesAnsModelPage implements OnInit {

  @Input() objectref: Array<any>;

  length = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  constructor() { }

  ngOnInit() {
    console.log('input data = > ', this.objectref);

  }

}
