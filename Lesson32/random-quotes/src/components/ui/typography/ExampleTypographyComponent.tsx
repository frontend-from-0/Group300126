import { ReactNode } from 'react';

export enum Color {
  Blue = 'blue',
  Red = 'red',
  Green = 'green'
}



interface ExampleTypographyComponentProps {
  title: string;
  variant?: 'default' | 'secondary' | 'accent';
  color: Color,
  children: ReactNode
}

export function ExampleTypographyComponent({
  title,
  variant = 'default',
  color,
  children,
}: ExampleTypographyComponentProps)  {
  return <span>{children}</span>;
}
