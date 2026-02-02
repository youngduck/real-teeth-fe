// OpenWeatherMap API 응답 타입 정의

export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWeatherWind {
  speed: number;
  deg: number;
}

export interface IWeatherCoord {
  lon: number;
  lat: number;
}

export interface ICurrentWeather {
  coord: IWeatherCoord;
  weather: IWeatherCondition[];
  main: IWeatherMain;
  wind: IWeatherWind;
  name: string;
  dt: number;
}

export interface IForecastItem {
  dt: number;
  main: IWeatherMain;
  weather: IWeatherCondition[];
  dt_txt: string;
}

export interface IForecast {
  list: IForecastItem[];
  city: {
    name: string;
    coord: IWeatherCoord;
  };
}
