import { BlockRenderer } from '../blocks/block-renderer';
import type { ContentSectionProps } from './props';
import styles from './styles.module.scss';

export const ContentSection = ({ componentCounters, index, section }: ContentSectionProps) => (
  <section className={styles.root} id={section.id}>
    <div className={styles.heading}>
      <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
      <div>
        <p className={styles.eyebrow}>Seção</p>
        <h2 className={styles.title}>{section.title}</h2>
      </div>
    </div>
    <div className={styles.blocks}>
      {section.blocks.map((block, blockIndex) => (
        <BlockRenderer
          block={block}
          componentCounters={componentCounters}
          key={section.id + '-' + block.type + '-' + blockIndex}
        />
      ))}
    </div>
  </section>
);
