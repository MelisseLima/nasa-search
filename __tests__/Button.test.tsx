import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Button} from './../components';

describe('Button component', () => {

    test('renders snapshot unchanged', () => {
        const label = 'Click me';
        const { container } = render(<Button label={label}/>)
        expect(container).toMatchSnapshot()
    })
    test('renders button with label', () => {
        const label = 'Click me';
        const { getByText } = render(<Button label={label} />);
        const buttonElement = getByText(label);
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick handler when clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button label="Click me" onClick={onClick} />);
        const buttonElement = getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('applies the "primary" class when primary prop is true', () => {
        const { container } = render(<Button label="Button" primary />);
        expect(container.firstChild).toHaveClass('storybook-button--primary');
    });

    test('applies the correct size class based on the size prop', () => {
        const { container } = render(<Button label="Button" size="large" />);
        expect(container.firstChild).toHaveClass('storybook-button--large');
    });
});
