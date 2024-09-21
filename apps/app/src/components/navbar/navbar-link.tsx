import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  name: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = (props) => {
  return (
    <li className="px-3 py-1 flex items-center hover:bg-muted">
      <Link className="w-full" href={props.href}>
        {props.name}
      </Link>
    </li>
  );
};

export { NavbarLink };
