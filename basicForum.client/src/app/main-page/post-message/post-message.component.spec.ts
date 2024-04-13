import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMessageComponent } from './post-message.component';

describe('PostMessageComponent', () => {
  let component: PostMessageComponent;
  let fixture: ComponentFixture<PostMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
