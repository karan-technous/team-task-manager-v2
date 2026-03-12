import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconInput } from './icon-input';

describe('IconInput', () => {
  let component: IconInput;
  let fixture: ComponentFixture<IconInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
