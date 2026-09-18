import type { SubtitleBlockProps } from './props';
import styles from './styles.module.scss';

export const SubtitleBlock = ({ block }: SubtitleBlockProps) => <h3 className={styles.root}>{block.content}</h3>;
