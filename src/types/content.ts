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

export interface ParagraphBlock {
  type: 'paragraph';
  content: string;
}

export interface SubtitleBlock {
  type: 'subtitle';
  content: string;
}

export interface ListItemData {
  title?: string;
  content: string;
  subitem?: boolean;
}

export interface ListBlock {
  type: 'list';
  children: ListItemData[];
}

export interface OrderedListBlock {
  type: 'ordered-list';
  start?: number;
  'list-type'?: '1' | 'a' | 'A' | 'i' | 'I';
  children: ListItemData[];
}

export interface CodeSnippet {
  language: string;
  description: string;
  code: string;
}

export interface CodeBoxBlock {
  type: 'code-box';
  title?: string;
  snippets: CodeSnippet[];
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt: string;
}

export interface VideoBlock {
  type: 'video';
  videoSrc: string;
}

export interface SliderBlock {
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
