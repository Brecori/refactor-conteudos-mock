import type { SliderBlock as SliderBlockData } from '../../../types/content';
import type { ComponentCounterRegistry } from '../../../utils/block-counters';

export interface SliderBlockProps {
  block: SliderBlockData;
  componentCounters: ComponentCounterRegistry;
}
