import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import React from "react";
import { Launchpad } from "@/lib/types/launches";

interface LaunchpadInfoProps {
  launchpad: Launchpad;
}

export default function LaunchpadInfo({ launchpad }: LaunchpadInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Launchpad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium">{launchpad.full_name}</h4>
          <p className="text-sm text-muted-foreground">
            {launchpad.locality}, {launchpad.region}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Attempts:</span>
            <p className="font-medium">{launchpad.launch_attempts}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Successes:</span>
            <p className="font-medium">{launchpad.launch_successes}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>
            <p className="font-medium capitalize">{launchpad.status}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate:</span>
            <p className="font-medium">
              {launchpad.launch_attempts > 0
                ? Math.round(
                    (launchpad.launch_successes / launchpad.launch_attempts) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        {launchpad.details && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {launchpad.details}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
