<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class WeatherController extends Controller
{
    public function fetch(Request $request)
    {
        $city = $request->query('city');
        if (!$city) {
            return response()->json(['error' => 'City parameter is required.'], 400);
        }

        $apiKey = env('OPENWEATHER_API_KEY');

        $geo = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $city,
            'appid' => $apiKey,
        ])->json();
        
        if (empty($geo)) {
            return response()->json(['error' => 'City not found'], 404);
        }
        
        $lat = $geo[0]['lat'];
        $lon = $geo[0]['lon'];
        
        // Fetch weather from openweather api
        $weather = Http::get('https://api.openweathermap.org/data/3.0/onecall', [
            'lat' => $lat,
            'lon' => $lon,
            'exclude' => 'minutely,hourly,alerts',
            'appid' => $apiKey,
            'units' => 'metric',
        ])->json();
        
        // I'm only gathering  wind, weather status, humidity and temperater
        $data = collect($weather['daily'])->map(function ($day) {
            return [
                'date' => date('Y-m-d', $day['dt']),
                'wind_speed' => $day['wind_speed'],
                'humidity' => $day['humidity'],
                'temperature' => [
                    'day' => $day['temp']['day'],
                    'min' => $day['temp']['min'],
                    'max' => $day['temp']['max'],
                    'night' => $day['temp']['night'],
                    'eve' => $day['temp']['eve'],
                    'morn' => $day['temp']['morn'],
                    'current' => null // Placeholder, will be filled if current data
                ],
                'weather' => $day['weather'][0]['main'],
            ];
        });
        
        // add current temperature into the current day's forecast
        // Accomodate different timezones with the timezone_offset

        $timezoneOffset = $weather['timezone_offset']; // in seconds
        $data = $data->map(function ($day) use ($weather, $timezoneOffset) {
            $currentDate = Carbon::createFromTimestamp($weather['current']['dt'] + $timezoneOffset)->format('Y-m-d');
            if ($day['date'] === $currentDate) {
                $day['temperature']['current'] = $weather['current']['temp'];
            }
            return $day;
        });
        
        return response()->json($data)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization');
    }
}
