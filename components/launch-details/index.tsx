import { LaunchStatusBadge } from "@/components/launch-status-badge";
import { ImageGallery } from "@/components/image-gallery";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Rocket as RocketIcon } from "lucide-react";
import { format } from "date-fns";
import RocketInfo from "./RocketInfo";
import LaunchpadInfo from "./LaunchpadInfo";
import Details from "./Details";
import type { Launch, Launchpad, Rocket } from "@/lib/types/launches";

interface LaunchDetailsProps {
  data: {
    launch: Launch;
    rocket: Rocket | null;
    launchpad: Launchpad | null;
  };
}

export default function LaunchDetails({ data }: LaunchDetailsProps) {
  const { launch, rocket, launchpad } = data;

  const launchDate = new Date(launch.date_utc);
  const allImages = [
    ...launch.links.flickr.original,
    ...launch.links.flickr.small,
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-3xl font-bold text-balance">{launch.name}</h1>
          <LaunchStatusBadge
            success={launch.success}
            upcoming={launch.upcoming}
          />
          <Badge variant="outline">Flight #{launch.flight_number}</Badge>
        </div>

        <div className="flex items-center gap-6 text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{format(launchDate, "PPP")}</span>
          </div>
          {launchpad && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{launchpad.full_name}</span>
            </div>
          )}
          {rocket && (
            <div className="flex items-center gap-2">
              <RocketIcon className="h-4 w-4" />
              <span>{rocket.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Launch Details */}
        <div className="lg:col-span-2 space-y-6">
          <Details launch={launch} />

          {/* Image Gallery */}
          {allImages.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <ImageGallery images={allImages} title="Launch Photos" />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {rocket && <RocketInfo rocket={rocket} />}

          {launchpad && <LaunchpadInfo launchpad={launchpad} />}
        </div>
      </div>
    </div>
  );
}
