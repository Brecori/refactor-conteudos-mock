import { useState } from 'react';
import { Button } from '../../button';
import { BlockRenderer } from '../block-renderer';
import type { SliderBlockProps } from './props';
import styles from './styles.module.scss';

export const SliderBlock = ({ block, componentCounters }: SliderBlockProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = block.slides[activeSlide];

  if (!slide) return null;

  return (
    <div className={styles.root}>
      <div className={styles.topline}>
        <span className={styles.label}>Slider</span>
        <span aria-live="polite">
          {activeSlide + 1} / {block.slides.length}
        </span>
      </div>
      <div className={styles.viewport}>
        <BlockRenderer block={slide} componentCounters={componentCounters} />
      </div>
      <div className={styles.actions}>
        <Button disabled={activeSlide === 0} variant="ghost" onClick={() => setActiveSlide(current => current - 1)}>
          ← Anterior
        </Button>
        <div className={styles.dots} aria-hidden="true">
          {block.slides.map((_, index) => (
            <span
              className={[styles.dot, activeSlide === index ? styles.activeDot : ''].filter(Boolean).join(' ')}
              key={index}
            />
          ))}
        </div>
        <Button
          disabled={activeSlide === block.slides.length - 1}
          variant="ghost"
          onClick={() => setActiveSlide(current => current + 1)}
        >
          Próximo →
        </Button>
      </div>
    </div>
  );
};
