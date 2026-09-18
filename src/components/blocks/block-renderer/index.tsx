import { CodeBoxBlock } from '../code-box-block';
import { ImageBlock } from '../image-block';
import { ListBlock } from '../list-block';
import { ParagraphBlock } from '../paragraph-block';
import { SliderBlock } from '../slider-block';
import { SubtitleBlock } from '../subtitle-block';
import { VideoBlock } from '../video-block';
import type { BlockRendererProps } from './props';
import styles from './styles.module.scss';

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  const renderBlock = () => {
    switch (block.type) {
      case 'paragraph':
        return <ParagraphBlock block={block} />;
      case 'subtitle':
        return <SubtitleBlock block={block} />;
      case 'list':
      case 'ordered-list':
        return <ListBlock block={block} />;
      case 'code-box':
        return <CodeBoxBlock block={block} />;
      case 'image':
        return <ImageBlock block={block} />;
      case 'video':
        return <VideoBlock block={block} />;
      case 'slider':
        return <SliderBlock block={block} />;
    }
  };

  return <div className={styles.root}>{renderBlock()}</div>;
};
