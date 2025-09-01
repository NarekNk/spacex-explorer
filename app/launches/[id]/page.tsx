import LaunchDetails from "@/components/launch-details";
import { fetchLaunchData, fetchAllLaunches } from "@/lib/api/launches";
import { notFound } from "next/navigation";

interface LaunchPageProps {
  params: {
    id: string;
  };
}

export default async function LaunchPage({ params }: LaunchPageProps) {
  const { id } = params;

  try {
    const data = await fetchLaunchData(id);

    return <LaunchDetails data={data} />;
  } catch (error) {
    console.error("Error fetching launch data:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const launches = await fetchAllLaunches();

    return launches.map((launch: { id: string }) => ({
      id: launch.id,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: LaunchPageProps) {
  const { id } = params;

  try {
    const { launch } = await fetchLaunchData(id);

    return {
      title: `${launch.name} - SpaceX Launch`,
      description: launch.details || `Details for SpaceX launch ${launch.name}`,
    };
  } catch {
    return {
      title: "Launch Not Found",
      description: "The requested launch could not be found.",
    };
  }
}
