import { useCallback } from 'react';
import TagBox from '../../components/write/TagBox';
import { useAppDispatch, useAppSelector } from '../../features';
import { changeField } from '../../features/writeSlice';

const TagBoxContainer = () => {
  const dispatch = useAppDispatch();
  const { tags } = useAppSelector(({ write }) => ({
    tags: write.tags,
  }));

  const onInsertTags = useCallback(
    (item: string) => {
      if (!item) return;
      if (tags.includes(item)) return;
      dispatch(changeField({ key: 'tags', value: [...tags, item] }));
    },
    [dispatch, tags],
  );

  const onRemoveTag = useCallback(
    (item: string) => {
      dispatch(
        changeField({ key: 'tags', value: tags.filter((t) => t !== item) }),
      );
    },
    [dispatch, tags],
  );
  return (
    <TagBox
      onInsertTags={onInsertTags}
      tagList={tags}
      onRemoveTag={onRemoveTag}
    />
  );
};

export default TagBoxContainer;
