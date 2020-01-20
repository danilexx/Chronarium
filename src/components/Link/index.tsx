// eslint-disable-next-line import/no-named-default
import { default as OriginalLink, LinkProps } from "next/link";

interface OwnProps {
  href?: string;
  className?: string;
}

const Link: React.FC<LinkProps & OwnProps> = ({
  href = "",
  children,
  className,
  ...props
}) => {
  return (
    <OriginalLink href={href}>
      <a className={className} {...props} href={href}>
        {children}
      </a>
    </OriginalLink>
  );
};
export default Link;
