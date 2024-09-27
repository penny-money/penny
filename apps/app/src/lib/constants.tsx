import { Mails, WalletCards } from "@penny/ui/icons";

interface SidebarLink {
  href: string;
  label: string;
  logo: React.ReactNode;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Envelopes",
    href: "/envelopes",
    logo: <Mails />,
  },
  {
    label: "Accounts",
    href: "/accounts",
    logo: <WalletCards />,
  },
];
