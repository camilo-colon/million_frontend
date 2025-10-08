import Image from "next/image";
import Link from "next/link";
import { cairo } from "@/ui/fonts";
import logo from "../../public/logo.svg";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="logo" as="/">
        <Image src={logo} alt="Logo" width={120} priority />
      </Link>
      <div className="flex items-center gap-4 text-xs lg:text-lg uppercase">
        <nav className="hidden lg:block">
          <ul className={`${cairo.className} flex gap-8 font-semibold`}>
            <li>
              <Link href="/">New Developments</Link>
            </li>
            <li>
              <Link href="/">Out Team</Link>
            </li>
            <li>
              <Link href="/">For Sale</Link>
            </li>
            <li>
              <Link href="/">Transactions</Link>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className="border rounded-lg py-1 px-4 cursor-pointer"
        >
          SELL YOUR UNIT
        </button>
      </div>
    </header>
  );
};
