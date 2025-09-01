import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function LaunchSkeleton() {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="flex items-center justify-center p-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full animate-pulse" />
      </CardContent>
      <CardFooter className="pt-3">
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}

export default LaunchSkeleton;
