export interface CountrySummary {
  country: string;
  countryCode: string;
  slug: string;
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
  date: string;
}

export interface GlobalSummary {
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
}

export interface CountryDailyStat {
  active: number;
  city?: string;
  cityCode?: string;
  confirmed: number;
  country: string;
  countryCode: string;
  date: string;
  deaths: number;
  lat: string;
  lon: string;
  province?: string;
  recovered: number;
}

export interface WeekTrendChartType {
  date: string;
  type: string;
  value: number;
}

export interface GlobalState {
  summary: GlobalSummary;
  countries: CountrySummary[];
  searchResults: CountrySummary[];
  countrySummary: CountryDailyStat[];
  date: string;
}

export interface CountryState {
  countrySlug: string;
  countryName: string;
  weekSummary: CountryDailyStat[];
  weekTrendStats: WeekTrendChartType[];
}
