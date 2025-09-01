"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Launch } from "@/lib/types/launches";

interface LaunchCardProps {
  launch: Launch;
  isFavorite: boolean;
  toggleFavorite: (launchId: string) => void;
}

export default function LaunchCard({
  launch,
  isFavorite,
  toggleFavorite,
}: LaunchCardProps) {
  return (
    <Card
      key={launch.id}
      className="h-fit hover:shadow-md transition-shadow relative"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(launch.id);
        }}
        className="absolute top-2 right-2 z-10 p-1 h-8 w-8 hover:bg-red-50"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-400"
          }`}
        />
      </Button>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight line-clamp-1 text-ellipsis pr-8">
          {launch.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-4">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
          <Image
            src={launch.links.patch.small! || "/placeholder.svg"}
            alt={`${launch.name} mission patch`}
            fill
            className="object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <CardAction className="w-full">
          <Button type="button" asChild className="w-full">
            <Link href={`/launches/${launch.id}`}>
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
