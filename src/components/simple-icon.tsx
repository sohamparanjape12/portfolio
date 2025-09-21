"use client";

import useWindowSize from '@rooks/use-window-size';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { SimpleIcon } from 'simple-icons';

interface SimpleIconProps {
  icon: SimpleIcon;
  size?: number;
  color?: string;
  isHover?: boolean;
}

const SimpleIconComponent: FC<SimpleIconProps> = ({ icon, size = 24, color = '#f0f0f0', isHover}) => {
  
  const { resolvedTheme } = useTheme();

  const { innerWidth } = useWindowSize();

  
  return (
    <svg
      width={innerWidth && innerWidth <= 478 ? 20 : size}
      height={innerWidth && innerWidth <= 478 ? 20 : size}
      viewBox="0 0 24 24"
      fill={resolvedTheme ? resolvedTheme == 'dark' ? '#f0f0f0' : '#0f0f0f' : color}
      xmlns="http://www.w3.org/2000/svg"
      className={"transition-all ease-in-out duration-400"}
    >
      <path d={icon.path} />
    </svg>
  );
};

export default SimpleIconComponent;
