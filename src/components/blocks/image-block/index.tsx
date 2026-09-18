import { useState } from 'react';
import { MediaPlaceholder } from '../media-placeholder';
import type { ImageBlockProps } from './props';
import styles from './styles.module.scss';

export const ImageBlock = ({ block, number }: ImageBlockProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={styles.root}>
      {hasError ? (
        <MediaPlaceholder
          alternativeText={block.alt}
          detail={block.url}
          message="Imagem indisponível no endereço de exemplo"
        />
      ) : (
        <img className={styles.image} src={block.url} alt={block.alt} onError={() => setHasError(true)} />
      )}
      <figcaption className={styles.caption}>Figura {number}: {block.alt}</figcaption>
    </figure>
  );
};
