import type { ContentBlock, ContentSection } from '../types/content';

export interface ComponentNumbers {
  codeBox?: number;
  figure?: number;
}

export type ComponentCounterRegistry = WeakMap<ContentBlock, ComponentNumbers>;

export const createComponentCounterRegistry = (sections: ContentSection[]): ComponentCounterRegistry => {
  const registry: ComponentCounterRegistry = new WeakMap();
  let codeBoxCount = 0;
  let figureCount = 0;

  const countBlocks = (blocks: ContentBlock[]): void => {
    blocks.forEach(block => {
      if (block.type === 'code-box') {
        codeBoxCount += 1;
        registry.set(block, { codeBox: codeBoxCount });
      }

      if (block.type === 'image') {
        figureCount += 1;
        registry.set(block, { figure: figureCount });
      }

      if (block.type === 'slider') {
        countBlocks(block.slides);
      }
    });
  };

  sections.forEach(section => countBlocks(section.blocks));

  return registry;
};
