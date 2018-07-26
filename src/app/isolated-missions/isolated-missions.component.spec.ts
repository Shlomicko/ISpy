import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsolatedMissionsComponent } from './isolated-missions.component';

describe('IsolatedMissionsComponent', () => {
  let component: IsolatedMissionsComponent;
  let fixture: ComponentFixture<IsolatedMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsolatedMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsolatedMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
