import classNames from 'classnames';
import { FC, HTMLProps, ReactNode } from 'react';
import './styles.css';

export type TypographyProps = {
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  /*
   * The CSS class name of the wrapper element.
   */
  className?: string;
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * If `true`, the text will have no margin.
   * @default true
   */
  noGutter?: boolean;
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom?: boolean;
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap?: boolean;
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph?: boolean;
  /**
   * Applies the theme typography styles.
   * @default 'regular1'
   */
  variant?:
    | 'bold1'
    | 'bold2'
    | 'bold3'
    | 'bold4'
    | 'bold5'
    | 'medium1'
    | 'medium2'
    | 'medium3'
    | 'medium4'
    | 'medium5'
    | 'regular1'
    | 'regular2'
    | 'regular3'
    | 'regular4'
    | 'regular5'
    | 'light1'
    | 'light2'
    | 'light3'
    | 'light4'
    | 'light5'
    | 'inherit';
} & HTMLProps<HTMLParagraphElement>;

const Typography: FC<TypographyProps> = ({
  variant = 'regular1',
  noGutter = false,
  gutterBottom = false,
  align = 'inherit',
  noWrap = false,
  children,
  className = '',
  ...restProps
}) => {
  const rootClassName = classNames(
    'typography',
    variant.includes('title') ? 'title' : '',
    `${variant}-typography`,
    noGutter ? 'noGutter' : '',
    gutterBottom ? 'gutterBottom' : '',
    noWrap ? 'noWrap' : '',
    align ? `text-${align}` : '',
    className ? className : ''
  );

  return (
    <span className={rootClassName} {...restProps}>
      {children}
    </span>
  );
};

export default Typography;