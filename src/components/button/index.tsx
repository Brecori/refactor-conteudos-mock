import type { ButtonProps } from './props';
import styles from './styles.module.scss';

export const Button = ({ children, className, type = 'button', variant = 'primary', ...props }: ButtonProps) => (
  <button className={[styles.root, styles[variant], className].filter(Boolean).join(' ')} type={type} {...props}>
    {children}
  </button>
);
