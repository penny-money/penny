"use client";

import { SIDEBAR_LINKS } from "@/lib/constants";
import { Tooltip, TooltipTrigger, TooltipContent } from "@penny/ui/tooltip";
import Link from "next/link";

export const NavbarMiddlePart: React.FC = () => {
  return (
    <ul className="space-y-2 py-2">
      {SIDEBAR_LINKS.map(({ label, href, logo }) => (
        <li key={label}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                className="size-16 hover:bg-accent flex items-center justify-center"
                href={href}
              >
                {logo}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};
