import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSopiComponent } from './add-sopi.component';

describe('AddSopiComponent', () => {
  let component: AddSopiComponent;
  let fixture: ComponentFixture<AddSopiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSopiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSopiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
