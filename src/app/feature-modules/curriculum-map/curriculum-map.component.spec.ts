import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumMapComponent } from './curriculum-map.component';

describe('CurriculumMapComponent', () => {
  let component: CurriculumMapComponent;
  let fixture: ComponentFixture<CurriculumMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
