import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 border-b flex items-center justify-between flex-wrap gap-x-16 gap-y-6">
      <Link href={"/"} className="text-3xl font-medium">
        SpaceX Launches
      </Link>

      <div className="flex items-center justify-between gap-4">
        <Link href={"/launches"}>Launches</Link>
        <Link href={"/favorites"}>Favorites</Link>
      </div>
    </header>
  );
};

export default Header;
