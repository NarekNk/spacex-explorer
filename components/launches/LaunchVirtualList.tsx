"use client";

import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import LaunchSkeleton from "./LaunchSkeleton";
import EmptyState from "./EmptyState";
import LaunchCard from "./LaunchCard";
import { Launch } from "@/lib/types/launches";

interface LaunchVirtualListProps {
  isLoading: boolean;
  launches: Array<Launch>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  favorites: Set<string>;
  fetchNextPage: () => void;
  toggleFavorite: (launchId: string) => void;
}

const GAP = 16;
const CARD_HEIGHT = 320;
const ROW_HEIGHT = CARD_HEIGHT + GAP;

export default function LaunchVirtualList({
  isLoading,
  launches,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  favorites,
  toggleFavorite,
}: LaunchVirtualListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const getColumns = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 768) return 2; // sm
      if (window.innerWidth < 1024) return 3; // md
      return 4; // lg+
    }
    return 4; // fallback
  };

  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    setColumns(getColumns()); // Set initial value

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const totalItems = hasNextPage ? launches.length + 1 : launches.length;

  const totalRows = Math.ceil(totalItems / columns);

  const rowVirtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
  });

  return (
    <div
      ref={parentRef}
      className="w-full h-[70vh] sm:h-[80vh] overflow-auto rounded-lg bg-white shadow-sm"
    >
      {isLoading ? (
        <div className="p-4">
          <div
            className={`grid gap-4 ${
              columns === 1
                ? "grid-cols-1"
                : columns === 2
                ? "grid-cols-2"
                : columns === 3
                ? "grid-cols-3"
                : "grid-cols-4"
            }`}
          >
            {Array.from({ length: columns * 3 }).map((_, i) => (
              <LaunchSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : launches.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
          }}
          className="p-4 relative w-full"
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * columns;
            const endIndex = Math.min(startIndex + columns, totalItems);
            const rowItems = [];

            for (let i = startIndex; i < endIndex; i++) {
              if (i >= launches.length) {
                rowItems.push({ type: "loader", index: i });
              } else {
                rowItems.push({
                  type: "launch",
                  launch: launches[i],
                  index: i,
                });
              }
            }

            return (
              <div
                key={virtualRow.key}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={`grid gap-4 absolute top-0 left-0 w-full ${
                  columns === 1
                    ? "grid-cols-1"
                    : columns === 2
                    ? "grid-cols-2"
                    : columns === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                }`}
              >
                {rowItems.map((item) => {
                  if (item.type === "loader") {
                    if (hasNextPage && !isFetchingNextPage) {
                      fetchNextPage();
                    }
                    return (
                      <div
                        key={`loader-${item.index}`}
                        className={`${
                          columns === 1
                            ? "col-span-1"
                            : columns === 2
                            ? "col-span-2"
                            : columns === 3
                            ? "col-span-3"
                            : "col-span-4"
                        } flex items-center justify-center text-gray-500 h-20`}
                      >
                        {isFetchingNextPage ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                            <span>Loading more...</span>
                          </div>
                        ) : (
                          "Nothing more to load"
                        )}
                      </div>
                    );
                  }

                  const { launch } = item;

                  if (!launch) return null;

                  return (
                    <LaunchCard
                      key={launch.id}
                      launch={launch}
                      isFavorite={favorites.has(launch.id)}
                      toggleFavorite={toggleFavorite}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
