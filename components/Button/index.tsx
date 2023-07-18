import React, { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import './styles.css';
import Typography from '../Typography';

interface ButtonProps extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>>{
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  startAddornment?: ReactNode;
  endAddornment?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  size = 'medium',
  label,
  startAddornment = null,
  endAddornment = null,
  children,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {startAddornment}
      <Typography variant={'regular5'} >
        {label}
        {children}
      </Typography>
      {endAddornment}
    </button>
  );
} 

export default Button;