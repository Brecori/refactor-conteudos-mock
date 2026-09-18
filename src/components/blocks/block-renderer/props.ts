import type { ContentBlock } from '../../../types/content';
import type { ComponentCounterRegistry } from '../../../utils/block-counters';

export interface BlockRendererProps {
  block: ContentBlock;
  componentCounters: ComponentCounterRegistry;
}
