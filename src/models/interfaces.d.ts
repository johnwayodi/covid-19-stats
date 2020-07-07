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

export interface DailyReport {
  date: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

export interface GlobalState {
  summary: GlobalSummary;
  countries: CountrySummary[];
  countrySummary: CountryDailyStat[];
  searchResults: CountrySummary[];
  date: string;
}

export interface CountryState {
  countrySlug: string;
  countryName: string;
  monthSummary: DailyReport[];
}
