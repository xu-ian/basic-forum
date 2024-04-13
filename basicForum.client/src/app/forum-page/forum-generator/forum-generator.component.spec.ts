import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumGeneratorComponent } from './forum-generator.component';

describe('ForumGeneratorComponent', () => {
  let component: ForumGeneratorComponent;
  let fixture: ComponentFixture<ForumGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
