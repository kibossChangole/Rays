"use client";

import { useState } from "react";
import { Sun, Cloud, CloudSun, Wind, Droplets, Loader2 } from "lucide-react";

// Definition of weather types here
type WeatherData = {
  date: string;
  wind_speed: number;
  humidity: number;
  temperature: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
    current: number;
  };
  weather: string;
};

async function getWeather(city: string) {
  const res = await fetch(`http://127.0.0.1:8888/weather?city=${city}`);
  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();
  return data;
}

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherDay2, setWeatherDay2] = useState<WeatherData | null>(null);
  const [weatherDay3, setWeatherDay3] = useState<WeatherData | null>(null);
  const [weatherDay4, setWeatherDay4] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempUnit, setTempUnit] = useState("C");

  // Get weather data on button click
  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const data = await getWeather(city);
      // From the array, select the first set of data as it is the current date
      const weatherToday = data[0];
      const weatherday2 = data[1];
      const weatherday3 = data[2];
      const weatherday4 = data[3];
      
      setWeather({
        date: weatherToday.date,
        wind_speed: weatherToday.wind_speed,
        humidity: weatherToday.humidity,
        temperature: weatherToday.temperature,
        weather: weatherToday.weather,
      });

      setWeatherDay2({
        date: weatherday2.date,
        wind_speed: weatherday2.wind_speed,
        humidity: weatherday2.humidity,
        temperature: weatherday2.temperature,
        weather: weatherday2.weather,
      });

      setWeatherDay3({
        date: weatherday3.date,
        wind_speed: weatherday3.wind_speed,
        humidity: weatherday3.humidity,
        temperature: weatherday3.temperature,
        weather: weatherday3.weather,
      });

      setWeatherDay4({
        date: weatherday4.date,
        wind_speed: weatherday4.wind_speed,
        humidity: weatherday4.humidity,
        temperature: weatherday4.temperature,
        weather: weatherday4.weather,
      });
    } catch (err) {
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // Weather Icons
  const getWeatherIcon = (condition: string) => {
    const lowercaseCondition = condition?.toLowerCase() || "";
    
    if (lowercaseCondition.includes("sun") || lowercaseCondition.includes("clear")) {
      return <Sun className="w-40 h-40" />;
    } else if (lowercaseCondition.includes("cloud") && lowercaseCondition.includes("sun")) {
      return <CloudSun className="w-40 h-40" />;
    } else if (lowercaseCondition.includes("cloud")) {
      return <Cloud className="w-40 h-40" />;
    } else {
      return <CloudSun className="w-40 h-40" />;
    }
  };

  const getWeatherIconsmall = (condition: string) => {
    const lowercaseCondition = condition?.toLowerCase() || "";
    
    if (lowercaseCondition.includes("sun") || lowercaseCondition.includes("clear")) {
      return <Sun className="w-12 h-12" />;
    } else if (lowercaseCondition.includes("cloud") && lowercaseCondition.includes("sun")) {
      return <CloudSun className="w-12 h-12" />;
    } else if (lowercaseCondition.includes("cloud")) {
      return <Cloud className="w-12 h-12" />;
    } else {
      return <CloudSun className="w-12 h-12" />;
    }
  };


  //Temperature conversion
  const convertTemp = (temp: number) => {
    if (tempUnit === "F") {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const tempSymbol = tempUnit === "C" ? "°C" : "°F";

  //dates formatting e.g. "21st April"
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
  
    // Get ordinal suffix
    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
  
    return `${getOrdinal(day)} ${month}`;
  }

  return (
    <div style={{height:'100vh',width:'100%',}} className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div style={{height:'100vh',width:'100%',}} className="flex flex-col md:flex-row">
        {/* Current weather panel */}
        {weather && (
          <div style={{justifyContent: "center"}} className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 md:w-1/3 flex flex-col justify-between">
            <div  className="flex justify-center mb-4">
              {getWeatherIcon(weather.weather)}
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {Math.trunc(convertTemp(weather.temperature.current))}{tempSymbol}
              </div>
              <div className="text-2xl font-medium mb-4">{weather.weather}</div>
            </div>
            
            <div className="text-center text-gray-600">
              <div className="font-medium">{formatDate(weather.date)}</div>
              <div>{city}</div>
            </div>
          </div>
        )}

        {/*Main section */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 md:w-3/3">
          {/* search bar */}
          <div style = {{width:'60%', justifySelf: 'center'}} className="flex mb-6">
            <div className="flex-grow">
              <form onSubmit={fetchWeather} className="flex">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Search city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "GO"}
                </button>
              </form>
            </div>
            <div className="ml-4 flex border border-gray-300 rounded">
              <button 
                className={`px-3 py-2 ${tempUnit === 'C' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => setTempUnit('C')}
                type="button"
              >
                °C
              </button>
              <button 
                className={`px-3 py-2 ${tempUnit === 'F' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => setTempUnit('F')}
                type="button"
              >
                °F
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          {!weather && !loading && !error && (
            <div className="text-center p-12 text-gray-500">
              Enter a city name and click "GO" to see the weather
            </div>
          )}

          {loading && (
            <div className="text-center p-12">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-500" />
              <p className="mt-4 text-gray-600">Loading weather data...</p>
            </div>
          )}

          {weather && (
            <>
              {/* 3-day forecast */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded p-4 text-center">
                  <div className="font-medium mb-2">{formatDate(weatherDay2.date)}</div>
                    <div style={{justifyItems:"center"}} className="text-lg font-semibold">
                      {getWeatherIconsmall(weatherDay2.weather)}

                      {Math.trunc(convertTemp(weatherDay2.temperature.morn))}{tempSymbol}
                    </div>
                    <div className="font-medium mb-2">Morning</div>
                  </div>
                  <div className="border border-gray-200 rounded p-4 text-center">
                  <div className="font-medium mb-2">{formatDate(weatherDay3.date)}</div>
                    <div style={{justifyItems:"center"}} className="text-lg font-semibold">
                      {getWeatherIconsmall(weatherDay3.weather)}
                      {Math.trunc(convertTemp(weatherDay3.temperature.morn))}{tempSymbol}
                    </div>
                    <div className="font-medium mb-2">Morning</div>
                  </div>
                  <div className="border border-gray-200 rounded p-4 text-center">
                  <div className="font-medium mb-2">{formatDate(weatherDay4.date)}</div>
                    <div style={{justifyItems:"center"}} className="text-lg font-semibold">
                      {getWeatherIconsmall(weatherDay4.weather)}
                      {Math.trunc(convertTemp(weatherDay4.temperature.morn))}{tempSymbol}
                    </div>
                    <div className="font-medium mb-2">Morning</div>
                  </div>
                </div>
              </div>

              {/* Temperature ranges */}
              <div className="mb-6 border border-gray-200 rounded p-4">
                <div className="font-medium mb-2">Temperature Range</div>
                <div className="flex items-center justify-between">
                  <div className="text-blue-500 font-semibold">
                    Min: {convertTemp(weather.temperature.min)}{tempSymbol}
                  </div>
                  <div className="text-red-500 font-semibold">
                    Max: {convertTemp(weather.temperature.max)}{tempSymbol}
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-red-400 h-2.5 rounded-full" 
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              {/* wind and humidity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded p-4">
                  <div className="text-gray-500 mb-2">Wind Status</div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{weather.wind_speed} km/h</div>
                    <Wind className="text-gray-400" />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded p-4">
                  <div className="text-gray-500 mb-2">Humidity</div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{weather.humidity}%</div>
                    <Droplets className="text-blue-400" />
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-400 h-2.5 rounded-full" 
                      style={{ width: `${weather.humidity}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}