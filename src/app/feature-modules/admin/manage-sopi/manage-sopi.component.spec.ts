import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSopiComponent } from './manage-sopi.component';

describe('ManageSopiComponent', () => {
  let component: ManageSopiComponent;
  let fixture: ComponentFixture<ManageSopiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSopiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSopiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
