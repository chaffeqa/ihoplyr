import React from 'react';
import clsx from 'clsx';
import { withRouter, WithRouterProps } from 'next/router';
import NextLink, {LinkState} from 'next/link';
import MuiLink, {LinkProps} from '@material-ui/core/Link';


export const NextComposed = React.forwardRef(({ as, href, prefetch, ...other }: LinkState, ref: any) => (
  <NextLink href={href} prefetch={prefetch} as={as} ref={ref}>
    <a {...other} />
  </NextLink>
));

interface IProps extends LinkState, LinkProps, WithRouterProps {
  naked?: boolean;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: IProps) {
  const { activeClassName, router, className: classNameProps, naked, ...other } = props;

  const className = clsx(classNameProps, {
    [activeClassName || 'active']: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} {...other} />;
}


export default withRouter(Link);
