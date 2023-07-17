import classNames from 'classnames';
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes, PropsWithChildren } from 'react';
import './styles.css';

export type TextTypes = 'text';

interface IInput extends HTMLAttributes<HTMLInputElement> {
  name?: string
  error?: string;
  type: TextTypes;
  value?: string;
  required?: boolean;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, PropsWithChildren<IInput>> = (
  { error, className, ...rest },
  ref
): JSX.Element => {
  return (
    <input
      className={classNames('input-primary', className, error ? 'error-input' : '')}
      {...rest}
      ref={ref}
    />
  );
};

export default forwardRef(Input);