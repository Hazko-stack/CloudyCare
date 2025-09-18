// types/weather.ts

export interface WeatherData {
  utc_datetime: string;
  local_datetime: string;
  t: number; // Temperature in Celsius
  hu: number; // Humidity percentage
  weather_desc: string; // Weather description in Indonesian
  weather_desc_en: string; // Weather description in English
  ws: number; // Wind speed in km/h
  wd: string; // Wind direction
  tcc: number; // Total cloud cover percentage
  vs_text: string; // Visibility in km
  analysis_date: string; // Analysis date in UTC
}

export interface LocationInfo {
  adm1: string; // Province code
  adm2: string; // City/Regency code
  adm3: string; // District code
  adm4: string; // Village/Kelurahan code
  desa: string; // Village/Kelurahan name
  kecamatan: string; // District name
  kota: string; // City/Regency name
  provinsi: string; // Province name
}

export interface WeatherApiResponse {
  data: WeatherData[];
  lokasi: LocationInfo;
}

export interface WeatherCardProps {
  weather: WeatherData;
  isCurrentHour?: boolean;
}

export interface GroupedWeatherData {
  date: string;
  data: WeatherData[];
}

// Error types
export interface ApiError {
  error: string;
  details?: string;
}

// Weather condition types for better type safety
export type WeatherCondition = 
  | 'cerah'
  | 'berawan'
  | 'hujan'
  | 'badai'
  | 'kabut'
  | 'mendung'
  | 'gerimis'
  | 'hujan_lebat'
  | 'petir';

// Wind direction types
export type WindDirection = 
  | 'N' | 'NE' | 'E' | 'SE' 
  | 'S' | 'SW' | 'W' | 'NW'
  | 'CALM' | 'VAR';

// Utility types
export interface WeatherSearchParams {
  adm4: string;
}

export interface WeatherState {
  data: WeatherApiResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Component prop types
export interface SearchFormProps {
  onSearch: (code: string) => void;
  loading: boolean;
  initialValue?: string;
}

export interface LocationDisplayProps {
  location: LocationInfo;
}

export interface WeatherGridProps {
  weatherData: WeatherData[];
  currentHourIndex: number;
}

// Constants
export const REGION_CODES = {
  JAKARTA_KEMAYORAN: '31.71.03.1001',
  JAKARTA_MENTENG: '31.71.05.1005',
  BANDUNG_CITARUM: '32.73.01.1001',
  SURABAYA_GENTENG: '35.78.02.1001',
  MEDAN_MEDAN_BARU: '12.71.05.1001',
  DENPASAR_DENPASAR_TIMUR: '51.71.02.1001',
} as const;

export const WEATHER_ICONS: Record<string, string> = {
  cerah: '☀️',
  'cerah berawan': '🌤️',
  berawan: '☁️',
  'berawan tebal': '☁️',
  'hujan ringan': '🌦️',
  hujan: '🌧️',
  'hujan lebat': '🌧️',
  'hujan petir': '⛈️',
  badai: '⛈️',
  kabut: '🌫️',
  mendung: '☁️',
  gerimis: '🌦️',
} as const;

// Utility functions types
export type FormatDateFunction = (date: string) => string;
export type FormatTimeFunction = (datetime: string) => string;
export type GetWeatherIconFunction = (description: string) => string;