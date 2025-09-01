import { redirect } from "next/navigation";

export default function Home() {
  redirect("/launches");

  return <div>Home</div>;
}
