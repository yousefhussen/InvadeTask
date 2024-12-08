import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreTaskComponent } from './restore-task.component';

describe('RestoreTaskComponent', () => {
  let component: RestoreTaskComponent;
  let fixture: ComponentFixture<RestoreTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoreTaskComponent]
    });
    fixture = TestBed.createComponent(RestoreTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
