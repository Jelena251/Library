import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBookComponent } from './default-book.component';

describe('DefaultBookComponent', () => {
  let component: DefaultBookComponent;
  let fixture: ComponentFixture<DefaultBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
