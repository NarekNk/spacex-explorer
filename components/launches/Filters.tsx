"use client";

import { useState, FC, SetStateAction, Dispatch } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpDown,
  Calendar,
  Filter,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LaunchFilters, SortOptions } from "@/lib/types/launches";

interface FiltersProps {
  filters: LaunchFilters;
  setFilters: Dispatch<SetStateAction<LaunchFilters>>;
  debouncedSearch: string;
}

const Filters: FC<FiltersProps> = ({
  filters,
  setFilters,
  debouncedSearch,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const hasActiveFilters =
    filters.search ||
    filters.success !== null ||
    filters.upcoming !== null ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.sortBy !== "date_desc";

  const setSearch = (value: string) =>
    setFilters({ ...filters, search: value });
  const setSuccessFilter = (success: boolean | null) =>
    setFilters({ ...filters, success });
  const setUpcomingFilter = (upcoming: boolean | null) =>
    setFilters({ ...filters, upcoming });
  const setDateFrom = (date: string) =>
    setFilters({ ...filters, dateFrom: date });
  const setDateTo = (date: string) => setFilters({ ...filters, dateTo: date });
  const setSortBy = (sort: SortOptions) =>
    setFilters({ ...filters, sortBy: sort });

  const clearAllFilters = () => {
    setFilters({
      search: "",
      sortBy: SortOptions.DATE_DESC,
      success: null,
      upcoming: null,
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <Card
      className={`fixed top-24 right-4 z-50 bg-white shadow-lg border transition-all duration-300 ${
        isSidebarCollapsed ? "w-24" : "w-80"
      } max-h-[calc(100vh-2rem)] overflow-hidden`}
    >
      <CardHeader
        className={`flex flex-row items-center ${
          !isSidebarCollapsed ? "justify-between pb-3" : "justify-center pb-0"
        } px-2`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1 h-8 w-8"
        >
          {!isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
        <CardTitle className="text-lg flex items-center gap-2">
          {!isSidebarCollapsed ? "Filters" : ""}
          <Filter className="w-5 h-5" />
        </CardTitle>
      </CardHeader>

      {!isSidebarCollapsed && (
        <CardContent className="space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {/* Clear All Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full bg-transparent"
              size="sm"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          )}

          {/* Search Bar */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search launches..."
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full"
              />
              {filters.search !== debouncedSearch && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select
              value={filters.success?.toString() || "all"}
              onValueChange={(value) =>
                setSuccessFilter(value === "all" ? null : value === "true")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="true">Success</SelectItem>
                <SelectItem value="false">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timeline Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Timeline
            </label>
            <Select
              value={filters.upcoming?.toString() || "all"}
              onValueChange={(value) =>
                setUpcomingFilter(value === "all" ? null : value === "true")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="true">Upcoming</SelectItem>
                <SelectItem value="false">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: SortOptions) => setSortBy(value)}
            >
              <SelectTrigger className="w-full">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SortOptions.DATE_DESC}>
                  Date (Newest First)
                </SelectItem>
                <SelectItem value={SortOptions.DATE_ASC}>
                  Date (Oldest First)
                </SelectItem>
                <SelectItem value={SortOptions.NAME_ASC}>Name (A-Z)</SelectItem>
                <SelectItem value={SortOptions.NAME_DESC}>
                  Name (Z-A)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </div>
            <div className="space-y-2">
              <Input
                type="date"
                placeholder="From date"
                value={filters.dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full"
              />
              <Input
                type="date"
                placeholder="To date"
                value={filters.dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full"
              />
              {(filters.dateFrom || filters.dateTo) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDateFrom("");
                    setDateTo("");
                  }}
                  className="w-full"
                >
                  Clear Dates
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default Filters;
