import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingAiLineComponent } from './writing-ai-line.component';

describe('WritingAiLineComponent', () => {
  let component: WritingAiLineComponent;
  let fixture: ComponentFixture<WritingAiLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingAiLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingAiLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
