import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket as RocketIcon } from "lucide-react";
import { Rocket } from "@/lib/types/launches";

interface RocketInfoProps {
  rocket: Rocket;
}

export default function RocketInfo({ rocket }: RocketInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RocketIcon className="h-5 w-5" />
          Rocket
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium">{rocket.name}</h4>
          <p className="text-sm text-muted-foreground">{rocket.type}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Height:</span>
            <p className="font-medium">{rocket.height.meters}m</p>
          </div>
          <div>
            <span className="text-muted-foreground">Stages:</span>
            <p className="font-medium">{rocket.stages}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate:</span>
            <p className="font-medium">{rocket.success_rate_pct}%</p>
          </div>
          <div>
            <span className="text-muted-foreground">Active:</span>
            <p className="font-medium">{rocket.active ? "Yes" : "No"}</p>
          </div>
        </div>

        {rocket.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {rocket.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
