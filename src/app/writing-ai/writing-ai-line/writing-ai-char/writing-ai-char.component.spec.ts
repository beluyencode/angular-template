import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingAiCharComponent } from './writing-ai-char.component';

describe('WritingAiCharComponent', () => {
  let component: WritingAiCharComponent;
  let fixture: ComponentFixture<WritingAiCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingAiCharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingAiCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
