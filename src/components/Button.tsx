import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

export const Button: FC<Props> = ({
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded font-medium dark:bg-neutral-900 transition-all',
        variant === 'default'
          ? 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-neutral-700 cursor-pointer transition-all'
          : 'border border-gray-300 text-black bg-white hover:bg-gray-100',
        className
      )}
    />
  );
};
