import type { CSSProperties } from 'react';
import type { ContentDocument } from '../types/content';
import { BlockRenderer } from './blocks/block-renderer';

interface ContentPageProps {
  document: ContentDocument;
}

const accentColors = ['#3b82f6', '#7c3aed', '#db2777', '#ea580c'];

export const ContentPage = ({ document }: ContentPageProps) => {
  const { content, sections } = document;
  const accent = accentColors[(content.theme - 1) % accentColors.length] ?? accentColors[0];
  const pageStyle = { '--accent': accent } as CSSProperties;

  return (
    <div className="page-shell" style={pageStyle}>
      <header className="hero">
        <nav className="topbar" aria-label="Informações do protótipo">
          <span className="brand-mark">FIAP · LAB</span>
          <span className="request-status">
            <i /> GET /teste.json · 200
          </span>
        </nav>

        <div className="hero__content">
          <div>
            <p className="eyebrow">
              {content.course} <span>/</span> {content.discipline}
            </p>
            <h1>{content.title}</h1>
            <p className="hero__description">
              Protótipo do template consumindo uma estrutura de conteúdo externa, sem acoplamento entre dados e layout.
            </p>
          </div>
          <div className="chapter-badge">
            <span>Capítulo</span>
            <strong>{content.chapterNumber.padStart(2, '0')}</strong>
          </div>
        </div>
      </header>

      <div className="content-layout">
        <main>
          {sections.map((section, sectionIndex) => (
            <section className="content-section" id={section.id} key={section.id}>
              <div className="section-heading">
                <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
                <div>
                  <p>Seção</p>
                  <h2>{section.title}</h2>
                </div>
              </div>
              <div className="section-blocks">
                {section.blocks.map((block, blockIndex) => (
                  <BlockRenderer block={block} key={`${section.id}-${block.type}-${blockIndex}`} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      <footer>
        <span>Protótipo técnico</span>
        <span>conteúdo #{content.id} · schema v{document.schemaVersion}</span>
      </footer>
    </div>
  );
};
