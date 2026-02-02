/**
 * 작성자: KYD
 * 기능: 날씨 정보 표시 컴포넌트
 * 프로세스 설명: OpenWeatherMap API로부터 받은 날씨 데이터를 UI로 표시
 */
import { Card } from "@youngduck/yd-ui";
import { useMemo, useState } from "react";

import { useGetForecastByAddressSuspense, useGetWeatherByAddressSuspense } from "@entities/weather";
import { LocationSearchInput } from "@features/location-search";

export const WeatherDisplay = () => {
  //SECTION HOOK호출 영역
  const [selectedAddress, setSelectedAddress] = useState("서울특별시");
  const { data: weatherData } = useGetWeatherByAddressSuspense(selectedAddress);
  const { data: forecastData } = useGetForecastByAddressSuspense(selectedAddress);
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleLocationSelect = (location: string) => {
    setSelectedAddress(location);
  };
  //!SECTION 메서드 영역

  const { weather, addressName } = weatherData;
  const currentWeather = weather.weather[0];
  const main = weather.main;

  // 오늘 날짜의 forecast 데이터 필터링 및 최저/최고 기온 계산
  const todayForecast = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("forecastData", forecastData);

    const todayItems = forecastData.forecast.list.filter((item) => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate >= today && itemDate < tomorrow;
    });

    if (todayItems.length === 0) return null;

    const temps = todayItems.map((item) => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    return {
      items: todayItems,
      minTemp,
      maxTemp,
    };
  }, [forecastData.forecast.list]);

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
    <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">날씨 정보</h1>

    <div className="mb-6 w-full max-w-md sm:max-w-lg lg:max-w-xl">
      <LocationSearchInput onLocationSelect={handleLocationSelect} />
    </div>

    <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
      <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl lg:text-3xl">{addressName} 날씨</h2>

      <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center lg:gap-6">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt={currentWeather.description}
          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
        />
        <div className="text-center sm:text-left">
          <p className="text-yds-h2 font-bold text-white sm:text-4xl lg:text-5xl">{Math.round(main.temp)}°C</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 text-sm sm:gap-6 lg:gap-8">
        <div className="text-center sm:text-left">
          <p className="mb-1 text-white sm:text-sm lg:text-base">당일 최저 기온</p>
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
            {todayForecast ? Math.round(todayForecast.minTemp) : Math.round(main.temp_min)}°C
          </p>
        </div>
        <div className="text-center sm:text-left">
          <p className="mb-1 text-white sm:text-sm lg:text-base">당일 최고 기온</p>
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
            {todayForecast ? Math.round(todayForecast.maxTemp) : Math.round(main.temp_max)}°C
          </p>
        </div>
      </div>

      {todayForecast && todayForecast.items.length > 0 && (
        <div className="border-t border-white/20 pt-6">
          <h3 className="mb-4 text-lg font-bold text-white sm:text-xl lg:text-2xl">시간대별 기온</h3>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {todayForecast.items.map((item) => {
              const date = new Date(item.dt * 1000);
              const hours = date.getHours();
              const timeLabel = `${hours}시`;

              return (
                <div key={item.dt} className="text-center">
                  <p className="mb-1 text-white sm:text-sm lg:text-base">{timeLabel}</p>
                  <p className="text-base font-semibold text-white sm:text-lg lg:text-xl">
                    {Math.round(item.main.temp)}°C
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  </div>
  );
};
