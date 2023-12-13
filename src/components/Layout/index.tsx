import { ReactNode } from "react";
import { Bell, CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

import NetflixLogo from "@/assets/netflix.svg";

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={className}>
      <header
        className={twMerge(
          "bg-gradient-to-bl from-black to-[rgba(0,0,0,.7)]",
          "fixed flex h-[68px] w-full items-center justify-between px-6 md:px-14",
        )}
      >
        <div className="flex items-center gap-10">
          <img
            src={NetflixLogo}
            width={92.5}
            height={30}
            alt="The Netflix logo"
          />
          <nav>
            <ul className="hidden gap-5 text-sm md:flex">
              <li className="text-white hover:text-slate-300">
                <a href="/">Inicio</a>
              </li>
              <li className="text-white hover:text-slate-300">
                <a href="/">Series</a>
              </li>
              <li className="text-white hover:text-slate-300">
                <a href="/">Bombando</a>
              </li>
              <li className="text-white hover:text-slate-300">
                <a href="/">Minha lista</a>
              </li>
              <li className="text-white hover:text-slate-300">
                <a href="/">Navegar por idiomas</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <MagnifyingGlass size={24} className="text-white" />
          <Bell size={24} className="text-white" />
          <div className="flex h-8 min-w-[52px] items-center justify-between gap-4 rounded bg-blue-400 px-2">
            <p>LL</p>
            <CaretDown size={16} className="text-white" />
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col">{children}</main>
    </div>
  );
};

export { Layout };
