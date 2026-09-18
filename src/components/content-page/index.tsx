import { useMemo, type CSSProperties } from 'react';
import { ChapterHero } from '../chapter-hero';
import { ContentSection } from '../content-section';
import { PageFooter } from '../page-footer';
import { createComponentCounterRegistry } from '../../utils/block-counters';
import type { ContentPageProps } from './props';
import styles from './styles.module.scss';

const accentColors = ['#3b82f6', '#7c3aed', '#db2777', '#ea580c'];

export const ContentPage = ({ document }: ContentPageProps) => {
  const { content, sections } = document;
  const accent = accentColors[(content.theme - 1) % accentColors.length] ?? accentColors[0];
  const pageStyle = { '--accent': accent } as CSSProperties;
  const componentCounters = useMemo(() => createComponentCounterRegistry(sections), [sections]);

  return (
    <div className={styles.root} style={pageStyle}>
      <ChapterHero content={content} />
      <div className={styles.content}>
        <main className={styles.main}>
          {sections.map((section, index) => (
            <ContentSection componentCounters={componentCounters} index={index} key={section.id} section={section} />
          ))}
        </main>
      </div>
      <PageFooter contentId={content.id} schemaVersion={document.schemaVersion} />
    </div>
  );
};
