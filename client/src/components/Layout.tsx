import React from 'react';
import { NavBar } from './NavBar';
import { WrapperVariant, Wrappper } from './Wrapper';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrappper variant={variant}>{children}</Wrappper>
    </>
  );
};
