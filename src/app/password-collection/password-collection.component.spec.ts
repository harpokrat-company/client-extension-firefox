import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCollectionComponent } from './password-collection.component';

describe('PasswordCollectionComponent', () => {
  let component: PasswordCollectionComponent;
  let fixture: ComponentFixture<PasswordCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
