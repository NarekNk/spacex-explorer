import { LaunchStatusBadge } from "@/components/launch-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Youtube, FileText, Globe } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { Launch } from "@/lib/types/launches";

interface DetailsProps {
  launch: Launch;
}

export default function Details({ launch }: DetailsProps) {
  const launchDate = new Date(launch.date_utc);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Launch Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {launch.details && (
          <p className="text-muted-foreground leading-relaxed">
            {launch.details}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">Launch Time</h4>
            <p className="text-sm text-muted-foreground">
              {format(launchDate, "PPP p")} UTC
            </p>
            <p className="text-sm text-muted-foreground">
              Local: {format(new Date(launch.date_local), "PPP p")}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Mission Status</h4>
            <div className="space-y-1">
              <LaunchStatusBadge
                success={launch.success}
                upcoming={launch.upcoming}
              />
              {launch.failures.length > 0 && (
                <div className="text-sm text-destructive">
                  {launch.failures.length} failure(s) reported
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links */}
        {(launch.links.webcast ||
          launch.links.article ||
          launch.links.wikipedia ||
          launch.links.presskit) && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-3">External Links</h4>
              <div className="flex gap-2 flex-wrap">
                {launch.links.webcast && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={launch.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      Watch Launch
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
                {launch.links.article && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={launch.links.article}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Article
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
                {launch.links.wikipedia && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Wikipedia
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
                {launch.links.presskit && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={launch.links.presskit}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Press Kit
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
