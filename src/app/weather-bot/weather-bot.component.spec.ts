import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBotComponent } from './weather-bot.component';

describe('WeatherBotComponent', () => {
  let component: WeatherBotComponent;
  let fixture: ComponentFixture<WeatherBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
