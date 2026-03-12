import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDialoge } from './popup-dialoge';

describe('PopupDialoge', () => {
  let component: PopupDialoge;
  let fixture: ComponentFixture<PopupDialoge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDialoge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDialoge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
