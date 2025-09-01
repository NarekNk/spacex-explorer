import { Rocket } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Rocket className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No launches found
      </h3>
      <p className="text-gray-500 max-w-md">
        Try adjusting your search terms or filters to find what you&apos;re
        looking for.
      </p>
    </div>
  );
}

export default EmptyState;
