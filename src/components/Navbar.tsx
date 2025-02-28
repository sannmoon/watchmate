import Link from "next/link";

const Navbar = () => (
  <nav className="bg-[#904496] p-4 flex items-center justify-between">
    <Link href="/" className="text-white text-3xl font-bold ml-[10%]">
      WatchMate
    </Link>

    <div className="mr-28 flex gap-6">
      <Link href="/movies" className="text-white text-xl hover:underline">
        Movies
      </Link>
      <Link href="/tvseries" className="text-white text-xl hover:underline">
        TV Series
      </Link>
    </div>
  </nav>
);

export default Navbar;
