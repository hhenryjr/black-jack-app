import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatSheetModalComponent } from './cheat-sheet-modal.component';

describe('CheatSheetModalComponent', () => {
  let component: CheatSheetModalComponent;
  let fixture: ComponentFixture<CheatSheetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheatSheetModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheatSheetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
