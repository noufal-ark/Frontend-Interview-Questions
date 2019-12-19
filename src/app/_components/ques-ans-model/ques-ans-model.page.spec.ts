import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuesAnsModelPage } from './ques-ans-model.page';

describe('QuesAnsModelPage', () => {
  let component: QuesAnsModelPage;
  let fixture: ComponentFixture<QuesAnsModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesAnsModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuesAnsModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
