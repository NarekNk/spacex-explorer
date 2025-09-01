import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="w-16 h-16 text-red-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 max-w-md mb-4">
        We couldn&apos;t load the launches. Please try again.
      </p>
      <Button onClick={onRetry} variant="outline">
        Try Again
      </Button>
    </div>
  );
}

export default ErrorState;
