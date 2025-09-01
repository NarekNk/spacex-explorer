import { Badge } from "@/components/ui/badge";

interface LaunchStatusBadgeProps {
  success: boolean | null;
  upcoming: boolean;
}

export function LaunchStatusBadge({
  success,
  upcoming,
}: LaunchStatusBadgeProps) {
  if (upcoming) {
    return (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 border-blue-200"
      >
        Upcoming
      </Badge>
    );
  }

  if (success === true) {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-200"
      >
        Success
      </Badge>
    );
  }

  if (success === false) {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 border-red-200"
      >
        Failed
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-gray-50 text-gray-700 border-gray-200"
    >
      Unknown
    </Badge>
  );
}
