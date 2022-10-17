import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavesComponent } from './faves.component';

describe('FavesComponent', () => {
  let component: FavesComponent;
  let fixture: ComponentFixture<FavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavesComponent ],
      imports:[
        HttpClientTestingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
