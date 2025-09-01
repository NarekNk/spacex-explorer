import { Launch } from "../types/launches";
import type { Rocket, Launchpad } from "@/lib/types/launches";

export interface LaunchesResponseType {
  docs: Launch[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  totalDocs: number;
  totalPages: number;
  prevPage: null;
}

interface SortOptions {
  date_utc?: "desc" | "asc";
  name?: "desc" | "asc";
}

interface Query {
  upcoming?: string;
  success?: string;
  name?:
    | {
        $regex: string;
        $options: string;
      }
    | undefined;
  date_utc?: {
    $gte?: string;
    $lte?: string;
  };
}

export async function fetchLaunches({
  pageParam = 1,
  favorites = { filter: false, list: [""] },
  ...params
}): Promise<LaunchesResponseType> {
  const query: Query = {
    ...(favorites.filter ? { _id: { $in: favorites.list } } : {}),
    ...(params.search
      ? { name: { $regex: params.search, $options: "i" } }
      : {}),
    ...(params.success !== null ? { success: params.success } : {}),
    ...(params.upcoming !== null ? { upcoming: params.upcoming } : {}),
  };
  let sortOptions: SortOptions = { date_utc: "desc" };

  if (params.dateFrom || params.dateTo) {
    query.date_utc = {};
    if (params.dateFrom) {
      query.date_utc.$gte = new Date(params.dateFrom).toISOString();
    }
    if (params.dateTo) {
      query.date_utc.$lte = new Date(
        params.dateTo + "T23:59:59.999Z"
      ).toISOString();
    }
  }

  switch (params.sortBy) {
    case "date_asc":
      sortOptions = { date_utc: "asc" };
      break;
    case "date_desc":
      sortOptions = { date_utc: "desc" };
      break;
    case "name_asc":
      sortOptions = { name: "asc" };
      break;
    case "name_desc":
      sortOptions = { name: "desc" };
      break;
  }
  const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      options: {
        page: pageParam,
        limit: 12,
        sort: sortOptions,
      },
    }),
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch launches");
  return res.json();
}

export async function fetchAllLaunches(): Promise<Array<Launch>> {
  const res = await fetch("https://api.spacexdata.com/v4/launches", {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch launches");
  return res.json();
}

export async function fetchLaunch({ id }: { id: string }): Promise<Launch> {
  const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch launches");
  return res.json();
}

export async function fetchRocket(id: string): Promise<Rocket> {
  const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch rocket data");
  }
  return response.json();
}

export async function fetchLaunchpad(id: string): Promise<Launchpad> {
  const response = await fetch(
    `https://api.spacexdata.com/v4/launchpads/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch launchpad data");
  }
  return response.json();
}

export async function fetchLaunchData(id: string) {
  try {
    // Fetch launch data first
    const launch = await fetchLaunch({ id });

    // Fetch rocket and launchpad data in parallel
    const [rocket, launchpad] = await Promise.all([
      launch.rocket ? fetchRocket(launch.rocket) : null,
      launch.launchpad ? fetchLaunchpad(launch.launchpad) : null,
    ]);

    return {
      launch,
      rocket,
      launchpad,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch launch data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
