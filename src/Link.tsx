import React from 'react';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { useRouter } from 'next/router';


export const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkProps & { as?: any, href?: any, className?: string }>(({ as, href, prefetch, ...other }, ref) => (
  <NextLink href={href} prefetch={prefetch} as={as} ref={ref} {...other} />
));

interface IProps extends Omit<MuiLinkProps, 'href'> {
  activeClassName?: string;
  naked?: boolean;
  href: NextLinkProps['href'];
  as?: NextLinkProps['as'];
  prefetch?: NextLinkProps['prefetch'];
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: IProps) {
  const { activeClassName, className: classNameProps, naked, ...other } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName || 'active']: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} {...(other as any)} />;
  }

  return <MuiLink component={NextComposed} className={className} {...(other as any)} />;
}

export default Link;

