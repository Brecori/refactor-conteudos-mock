import { useEffect, useState } from 'react';
import type { ContentBlock, ListItemData } from '../../types/content';

interface BlockRendererProps {
  block: ContentBlock;
}

const ListItems = ({ items }: { items: ListItemData[] }) => (
  <>
    {items.map((item, index) => (
      <li className={item.subitem ? 'list-item list-item--nested' : 'list-item'} key={`${item.content}-${index}`}>
        {item.title ? <strong>{item.title}: </strong> : null}
        {item.content}
      </li>
    ))}
  </>
);

const CodeBox = ({ block }: { block: Extract<ContentBlock, { type: 'code-box' }> }) => {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [copied, setCopied] = useState(false);
  const snippet = block.snippets[activeSnippet];

  useEffect(() => {
    if (!copied) return;
    const timeoutId = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  if (!snippet) return null;

  const copyCode = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
  };

  return (
    <div className="code-box">
      <div className="code-box__header">
        <div>
          <span className="block-label">Bloco de código</span>
          <h3>{block.title || 'Exemplo de código'}</h3>
        </div>
        <button className="button button--ghost" onClick={() => void copyCode()} type="button">
          {copied ? 'Copiado!' : 'Copiar código'}
        </button>
      </div>

      {block.snippets.length > 1 ? (
        <div className="code-tabs" role="tablist" aria-label="Trechos de código">
          {block.snippets.map((item, index) => (
            <button
              aria-selected={activeSnippet === index}
              className={activeSnippet === index ? 'code-tab code-tab--active' : 'code-tab'}
              key={`${item.language}-${index}`}
              onClick={() => setActiveSnippet(index)}
              role="tab"
              type="button"
            >
              {item.description}
            </button>
          ))}
        </div>
      ) : null}

      <div className="code-box__meta">
        <span>{snippet.description}</span>
        <span>{snippet.language}</span>
      </div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

const ImageBlock = ({ block }: { block: Extract<ContentBlock, { type: 'image' }> }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="media-card">
      {hasError ? (
        <div className="media-placeholder" role="img" aria-label={block.alt}>
          <span>Imagem indisponível no endereço de exemplo</span>
          <small>{block.url}</small>
        </div>
      ) : (
        <img src={block.url} alt={block.alt} onError={() => setHasError(true)} />
      )}
      <figcaption>{block.alt}</figcaption>
    </figure>
  );
};

const getVimeoEmbedUrl = (url: string): string | null => {
  const videoId = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
};

const VideoBlock = ({ block }: { block: Extract<ContentBlock, { type: 'video' }> }) => {
  const embedUrl = getVimeoEmbedUrl(block.videoSrc);

  return (
    <div className="video-card">
      <div className="video-card__topline">
        <span className="block-label">Vídeo</span>
        <a href={block.videoSrc} target="_blank" rel="noreferrer">
          Abrir origem ↗
        </a>
      </div>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="Vídeo do conteúdo"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <div className="media-placeholder">URL de vídeo não reconhecida</div>
      )}
    </div>
  );
};

const SliderBlock = ({ block }: { block: Extract<ContentBlock, { type: 'slider' }> }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = block.slides[activeSlide];

  if (!slide) return null;

  return (
    <div className="slider">
      <div className="slider__topline">
        <span className="block-label">Slider</span>
        <span aria-live="polite">
          {activeSlide + 1} / {block.slides.length}
        </span>
      </div>
      <div className="slider__viewport">
        <BlockRenderer block={slide} />
      </div>
      <div className="slider__actions">
        <button
          className="button button--ghost"
          disabled={activeSlide === 0}
          onClick={() => setActiveSlide(current => current - 1)}
          type="button"
        >
          ← Anterior
        </button>
        <div className="slider__dots" aria-hidden="true">
          {block.slides.map((_, index) => (
            <span className={activeSlide === index ? 'dot dot--active' : 'dot'} key={index} />
          ))}
        </div>
        <button
          className="button button--ghost"
          disabled={activeSlide === block.slides.length - 1}
          onClick={() => setActiveSlide(current => current + 1)}
          type="button"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
};

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="content-paragraph">{block.content}</p>;
    case 'subtitle':
      return <h3 className="content-subtitle">{block.content}</h3>;
    case 'list':
      return (
        <ul className="content-list">
          <ListItems items={block.children} />
        </ul>
      );
    case 'ordered-list':
      return (
        <ol className="content-list" start={block.start} type={block['list-type']}>
          <ListItems items={block.children} />
        </ol>
      );
    case 'code-box':
      return <CodeBox block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'video':
      return <VideoBlock block={block} />;
    case 'slider':
      return <SliderBlock block={block} />;
  }
};

