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
      className={`text-xs md:text-sm font-medium text-dracula-pink-400 border-b border-transparent hover:border-dracula-pink-400 ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
