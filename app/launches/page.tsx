import Launches from "@/components/launches";
import { fetchLaunches } from "@/lib/api/launches";

export default async function LaunchesPage() {
  const data = await fetchLaunches({
    pageParam: 1,
  });

  return <Launches initialData={[data]} />;
}
