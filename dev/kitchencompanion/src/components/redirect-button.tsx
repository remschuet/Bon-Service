import Link, { LinkProps } from "next/link";

export function RedirectButton({
  children,
  href,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  return (
    <Link {...props} href={href}>
      {children}
    </Link>
  );
}
