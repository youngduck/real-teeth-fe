/**
 * 작성자: KYD
 * 기능: 날씨 정보 표시 컴포넌트
 * 프로세스 설명: OpenWeatherMap API로부터 받은 날씨 데이터를 UI로 표시
 */
import { Card } from "@youngduck/yd-ui";
import { useState } from "react";

import { useGetWeatherByAddressSuspense } from "@entities/weather";
import { LocationSearchInput } from "@features/location-search";

export const WeatherDisplay = () => {
  //SECTION HOOK호출 영역
  const [selectedAddress, setSelectedAddress] = useState("서울특별시");
  const { data } = useGetWeatherByAddressSuspense(selectedAddress);
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleLocationSelect = (location: string) => {
    setSelectedAddress(location);
  };
  //!SECTION 메서드 영역

  const { weather, addressName } = data;
  const currentWeather = weather.weather[0];
  const main = weather.main;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl lg:text-4xl">날씨 정보</h1>

      <div className="mb-6 w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <LocationSearchInput onLocationSelect={handleLocationSelect} selectedLocation={selectedAddress} />
      </div>

      <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl lg:text-3xl">{addressName} 날씨</h2>

        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center lg:gap-6">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt={currentWeather.description}
            className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          />
          <div className="text-center sm:text-left">
            <p className="text-yds-h2 font-bold sm:text-4xl lg:text-5xl">{Math.round(main.temp)}°C</p>
            <p className="text-base text-gray-600 sm:text-lg lg:text-xl">{currentWeather.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:gap-6 lg:gap-8">
          <div className="text-center sm:text-left">
            <p className="mb-1 text-gray-500 sm:text-sm lg:text-base">체감 온도</p>
            <p className="text-lg font-semibold sm:text-xl lg:text-2xl">{Math.round(main.feels_like)}°C</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="mb-1 text-gray-500 sm:text-sm lg:text-base">습도</p>
            <p className="text-lg font-semibold sm:text-xl lg:text-2xl">{main.humidity}%</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="mb-1 text-gray-500 sm:text-sm lg:text-base">최저 기온</p>
            <p className="text-lg font-semibold sm:text-xl lg:text-2xl">{Math.round(main.temp_min)}°C</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="mb-1 text-gray-500 sm:text-sm lg:text-base">최고 기온</p>
            <p className="text-lg font-semibold sm:text-xl lg:text-2xl">{Math.round(main.temp_max)}°C</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
