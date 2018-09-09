import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBookComponentComponent } from './default-book-component.component';

describe('DefaultBookComponentComponent', () => {
  let component: DefaultBookComponentComponent;
  let fixture: ComponentFixture<DefaultBookComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultBookComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultBookComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
