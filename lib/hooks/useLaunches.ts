import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLaunches, LaunchesResponseType } from "../api/launches";
import { SortOptions } from "../types/launches";

interface UseLaunchesParams {
  initialData?: Array<LaunchesResponseType>;
  search?: string;
  success?: boolean | null;
  upcoming?: boolean | null;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: SortOptions;
  favorites: {
    filter: boolean;
    list: Array<string>;
  } | null;
  hasActiveFilters: boolean;
}

export function useLaunches({
  initialData,
  favorites,
  hasActiveFilters,
  ...params
}: UseLaunchesParams) {
  const initialPage = initialData && !hasActiveFilters ? 2 : 1;

  return useInfiniteQuery({
    ...(initialData && !hasActiveFilters
      ? {
          initialData: {
            pageParams: [1],
            pages: initialData,
          },
        }
      : {}),
    queryKey: ["launches", favorites?.filter, params, params.search],
    queryFn: ({ pageParam = initialPage }) => {
      console.log(pageParam, params);
      try {
        if (initialData && !hasActiveFilters && pageParam === 1) {
          return initialData[0];
        }
        return fetchLaunches({ pageParam, favorites: favorites!, ...params });
      } catch (error) {
        console.error(error);
        return {
          docs: [],
          hasNextPage: false,
          hasPrevPage: false,
          nextPage: pageParam,
        };
      }
    },
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    enabled: favorites !== null,
    retry: (failureCount, error: { status: number }) => {
      // Retry only for 429 or 5xx errors
      if (error.status === 429 || (error.status >= 500 && error.status < 600)) {
        return failureCount < 5; // max 5 retries
      }
      return false; // don't retry other errors
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });
}
