import React from 'react';
import { render } from '@testing-library/react';
import {Typography} from './../components';

describe('Typography component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(<Typography>Example Text</Typography>);
    const textElement = getByText('Example Text');
    expect(textElement).toBeInTheDocument();
  });

  test('applies custom class names to root element', () => {
    const { container } = render(<Typography className="custom-class">Example Text</Typography>);
    const typographyElement = container.querySelector('.typography');
    expect(typographyElement).toHaveClass('custom-class');
  });

  test('applies variant class to root element', () => {
    const { container } = render(<Typography variant="regular3">Example Text</Typography>);
    const typographyElement = container.querySelector('.typography');
    expect(typographyElement).toHaveClass('regular3-typography');
  });

  test('applies alignment class to root element', () => {
    const { container } = render(<Typography align="center">Example Text</Typography>);
    const typographyElement = container.querySelector('.typography');
    expect(typographyElement).toHaveClass('text-center');
  });

  test('displays gutter bottom when gutterBottom prop is true', () => {
    const { container } = render(<Typography gutterBottom>Example Text</Typography>);
    const typographyElement = container.querySelector('.typography');
    expect(typographyElement).toHaveClass('gutterBottom');
  });

  test('displays no gutter when noGutter prop is true', () => {
    const { container } = render(<Typography noGutter>Example Text</Typography>);
    const typographyElement = container.querySelector('.typography');
    expect(typographyElement).toHaveClass('noGutter');
  });

  test('displays no wrap when noWrap prop is true', () => {
    const { container } = render(<Typography noWrap>Example Text</Typography>);
    const typographyElement = container.querySelector('.typography');
    expect(typographyElement).toHaveClass('noWrap');
  });
});
