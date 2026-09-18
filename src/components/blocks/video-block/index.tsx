import { MediaPlaceholder } from '../media-placeholder';
import type { VideoBlockProps } from './props';
import styles from './styles.module.scss';

const getVimeoEmbedUrl = (url: string): string | null => {
  const videoId = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  return videoId ? 'https://player.vimeo.com/video/' + videoId : null;
};

export const VideoBlock = ({ block }: VideoBlockProps) => {
  const embedUrl = getVimeoEmbedUrl(block.videoSrc);

  return (
    <div className={styles.root}>
      <div className={styles.topline}>
        <span className={styles.label}>Vídeo</span>
        <a className={styles.link} href={block.videoSrc} target="_blank" rel="noreferrer">
          Abrir origem ↗
        </a>
      </div>
      {embedUrl ? (
        <iframe
          className={styles.frame}
          src={embedUrl}
          title="Vídeo do conteúdo"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <MediaPlaceholder alternativeText="Vídeo indisponível" message="URL de vídeo não reconhecida" />
      )}
    </div>
  );
};
