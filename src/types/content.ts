export interface ContentDocument {
  schemaVersion: number;
  content: ContentMetadata;
  sections: ContentSection[];
}

export interface ContentMetadata {
  id: string;
  title: string;
  chapterNumber: string;
  course: string;
  discipline: string;
  theme: number;
}

export interface ContentSection {
  id: string;
  type: 'section';
  title: string;
  blocks: ContentBlock[];
}

interface ParagraphBlock {
  type: 'paragraph';
  content: string;
}

interface SubtitleBlock {
  type: 'subtitle';
  content: string;
}

export interface ListItemData {
  title?: string;
  content: string;
  subitem?: boolean;
}

interface ListBlock {
  type: 'list';
  children: ListItemData[];
}

interface OrderedListBlock {
  type: 'ordered-list';
  start?: number;
  'list-type'?: '1' | 'a' | 'A' | 'i' | 'I';
  children: ListItemData[];
}

interface CodeSnippet {
  language: string;
  description: string;
  code: string;
}

interface CodeBoxBlock {
  type: 'code-box';
  title?: string;
  snippets: CodeSnippet[];
}

interface ImageBlock {
  type: 'image';
  url: string;
  alt: string;
}

interface VideoBlock {
  type: 'video';
  videoSrc: string;
}

interface SliderBlock {
  type: 'slider';
  slides: ContentBlock[];
}

export type ContentBlock =
  | ParagraphBlock
  | SubtitleBlock
  | ListBlock
  | OrderedListBlock
  | CodeBoxBlock
  | ImageBlock
  | VideoBlock
  | SliderBlock;

