import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBetModalComponent } from './side-bet-modal.component';

describe('SideBetModalComponent', () => {
  let component: SideBetModalComponent;
  let fixture: ComponentFixture<SideBetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBetModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
