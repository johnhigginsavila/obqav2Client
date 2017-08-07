import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEvidenceComponent } from './upload-evidence.component';

describe('UploadEvidenceComponent', () => {
  let component: UploadEvidenceComponent;
  let fixture: ComponentFixture<UploadEvidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEvidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
