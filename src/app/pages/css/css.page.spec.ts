import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CssPage } from './css.page';

describe('CssPage', () => {
  let component: CssPage;
  let fixture: ComponentFixture<CssPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
