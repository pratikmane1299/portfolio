import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

type ExternalLinkPropsType = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

function ExternalLink({
  children,
  className,
  ...rest
}: PropsWithChildren<ExternalLinkPropsType>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={`text-xs md:text-sm font-medium text-primary-foreground border-b-2 border-transparent hover:border-primary-foreground ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
