import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveEntitlementComponent } from './leave-entitlement.component';

describe('LeaveEntitlementComponent', () => {
  let component: LeaveEntitlementComponent;
  let fixture: ComponentFixture<LeaveEntitlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveEntitlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
