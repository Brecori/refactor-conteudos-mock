import type { ContentSection as ContentSectionData } from '../../types/content';
import type { ComponentCounterRegistry } from '../../utils/block-counters';

export interface ContentSectionProps {
  componentCounters: ComponentCounterRegistry;
  index: number;
  section: ContentSectionData;
}
