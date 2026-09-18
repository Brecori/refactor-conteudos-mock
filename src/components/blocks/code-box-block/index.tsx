import { useEffect, useState } from 'react';
import { Button } from '../../button';
import type { CodeBoxBlockProps } from './props';
import styles from './styles.module.scss';

export const CodeBoxBlock = ({ block, number }: CodeBoxBlockProps) => {
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
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Bloco de código {number}</span>
          <h3 className={styles.title}>{block.title || 'Exemplo de código'}</h3>
        </div>
        <Button variant="ghost" onClick={() => void copyCode()}>
          {copied ? 'Copiado!' : 'Copiar código'}
        </Button>
      </div>

      {block.snippets.length > 1 ? (
        <div className={styles.tabs} role="tablist" aria-label="Trechos de código">
          {block.snippets.map((item, index) => (
            <button
              aria-selected={activeSnippet === index}
              className={[styles.tab, activeSnippet === index ? styles.activeTab : ''].filter(Boolean).join(' ')}
              key={item.language + '-' + index}
              onClick={() => setActiveSnippet(index)}
              role="tab"
              type="button"
            >
              {item.description}
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.meta}>
        <span>{snippet.description}</span>
        <span>{snippet.language}</span>
      </div>
      <pre className={styles.code}>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};
