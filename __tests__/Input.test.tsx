import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Input} from './../components';
import { TextTypes } from '@/components/Input';

describe('Input component', () => {
  test('renders input element with correct type', () => {
    const type: TextTypes = 'text';
    const { container } = render(<Input type={type} />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', type);
  });

  test('applies custom class names to input element', () => {
    const { container } = render(<Input type="text" className="custom-class" />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toHaveClass('input-primary');
    expect(inputElement).toHaveClass('custom-class');
  });

  test('displays error state when error prop is provided', () => {
    const { container } = render(<Input type="text" error="Invalid input" />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toHaveClass('input-primary');
    expect(inputElement).toHaveClass('error-input');
  });

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input type="text" ref={ref} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
