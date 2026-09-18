import type { ParagraphBlockProps } from './props';
import styles from './styles.module.scss';

export const ParagraphBlock = ({ block }: ParagraphBlockProps) => <p className={styles.root}>{block.content}</p>;
