import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Launch Not Found</h2>
            <p className="text-muted-foreground">
              The requested launch could not be found or does not exist.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
