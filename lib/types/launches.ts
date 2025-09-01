export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  success: boolean | null;
  details: string | null;
  flight_number: number;
  rocket: string;
  launchpad: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  cores: Array<{
    core: string | null;
    flight: number | null;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean | null;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
  }>;
  payloads: string[];
  capsules: string[];
  ships: string[];
  crew: string[];
  failures: Array<{
    time: number;
    altitude: number | null;
    reason: string;
  }>;
  fairings: {
    reused: boolean | null;
    recovery_attempt: boolean | null;
    recovered: boolean | null;
    ships: string[];
  };
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  description: string;
  flickr_images: string[];
  wikipedia: string;
}

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  launches: string[];
  status: string;
  details: string;
}

export enum SortOptions {
  DATE_ASC = "date_asc",
  DATE_DESC = "date_desc",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
}

export interface LaunchFilters {
  search: string;
  success: boolean | null;
  upcoming: boolean | null;
  dateFrom: string;
  dateTo: string;
  sortBy: SortOptions;
}
