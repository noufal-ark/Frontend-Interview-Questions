import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JavascriptPage } from './javascript.page';

describe('JavascriptPage', () => {
  let component: JavascriptPage;
  let fixture: ComponentFixture<JavascriptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavascriptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JavascriptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
