import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HtmlPage } from './html.page';

describe('HtmlPage', () => {
  let component: HtmlPage;
  let fixture: ComponentFixture<HtmlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HtmlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
