import type { ListItemData } from '../../../types/content';
import type { ListBlockProps } from './props';
import styles from './styles.module.scss';

const ListItems = ({ items }: { items: ListItemData[] }) => (
  <>
    {items.map((item, index) => (
      <li className={item.subitem ? styles.nested : undefined} key={item.content + '-' + index}>
        {item.title ? <strong>{item.title}: </strong> : null}
        {item.content}
      </li>
    ))}
  </>
);

export const ListBlock = ({ block }: ListBlockProps) => {
  if (block.type === 'ordered-list') {
    return (
      <ol className={styles.root} start={block.start} type={block['list-type']}>
        <ListItems items={block.children} />
      </ol>
    );
  }

  return (
    <ul className={styles.root}>
      <ListItems items={block.children} />
    </ul>
  );
};
