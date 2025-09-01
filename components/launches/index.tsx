"use client";

import { useState, useCallback, useEffect } from "react";
import { useLaunches } from "@/lib/hooks/useLaunches";
import useDebounce from "@/hooks/useDebounce";
import ErrorState from "./ErrorState";
import Filters from "./Filters";
import LaunchVirtualList from "./LaunchVirtualList";
import { LaunchFilters, SortOptions } from "@/lib/types/launches";
import { LaunchesResponseType } from "@/lib/api/launches";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";

interface LaunchesProps {
  initialData?: LaunchesResponseType[];
  isFavorites?: boolean;
}

export default function Launches({
  initialData,
  isFavorites = false,
}: LaunchesProps) {
  const [filters, setFilters] = useState<LaunchFilters>({
    search: "",
    success: null,
    upcoming: null,
    dateFrom: "",
    dateTo: "",
    sortBy: SortOptions.DATE_DESC,
  });

  const [favorites, setFavorites] = useState<Set<string> | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("launch-favorites");
    if (savedFavorites) {
      try {
        const favoriteIds = JSON.parse(savedFavorites);
        setFavorites(new Set(favoriteIds));
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      }
    }
  }, []);

  const toggleFavorite = (launchId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(launchId)) {
        newFavorites.delete(launchId);
      } else {
        newFavorites.add(launchId);
      }

      // Save to localStorage
      localStorage.setItem(
        "launch-favorites",
        JSON.stringify(Array.from(newFavorites))
      );
      return newFavorites;
    });
  };

  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedDateFrom = useDebounce(filters.dateFrom, 500);
  const debouncedDateTo = useDebounce(filters.dateTo, 500);

  const hasActiveFilters =
    !!filters.search ||
    filters.success !== null ||
    filters.upcoming !== null ||
    !!filters.dateFrom ||
    !!filters.dateTo ||
    filters.sortBy !== "date_desc";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch,
    isLoading,
    isFetched,
  } = useLaunches({
    initialData,
    search: debouncedSearch.trim() || undefined,
    success: filters.success,
    upcoming: filters.upcoming,
    dateFrom: debouncedDateFrom || undefined,
    dateTo: debouncedDateTo || undefined,
    sortBy: filters.sortBy,
    favorites: favorites
      ? {
          filter: isFavorites,
          list: Array.from(favorites),
        }
      : null,
    hasActiveFilters,
  });

  const fetchNext = useDebounceCallback(fetchNextPage, 100);

  const launches = data?.pages.flatMap((page) => page.docs) ?? [];

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (error && !initialData?.length) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Launches</h1>
            <p className="text-gray-600">Explore space missions and launches</p>
          </div>
        </div>
        <ErrorState onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Filters
        filters={filters}
        setFilters={setFilters}
        debouncedSearch={debouncedSearch}
      />

      <div className={`px-4 space-y-6 pt-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isFavorites ? "Favorites" : "Launches"}
            </h1>
            <p className="text-gray-600">Explore space missions and launches</p>
          </div>
        </div>

        <LaunchVirtualList
          isLoading={isLoading || !isFetched}
          launches={launches}
          fetchNextPage={error ? () => {} : fetchNext}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          favorites={favorites!}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}
