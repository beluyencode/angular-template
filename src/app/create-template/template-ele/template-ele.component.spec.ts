import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEleComponent } from './template-ele.component';

describe('TemplateEleComponent', () => {
  let component: TemplateEleComponent;
  let fixture: ComponentFixture<TemplateEleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateEleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateEleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
