import styled from '@emotion/styled';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import palette from '../../lib/styles';

export interface TagBoxProps {
  onInsertTags: (item: string) => void;
  onRemoveTag: (item: string) => void;
  tagList: string[];
}

export interface TagItemProps {
  tag: string;
  onRemove: (value: string) => void;
}

export interface TagListProps {
  tags: string[];
  onRemove: (value: string) => void;
}

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-left: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo<TagItemProps>(({ tag, onRemove }) => {
  return <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>;
});

const TagList = React.memo<TagListProps>(({ tags, onRemove }) => {
  return (
    <TagListBlock>
      {tags.map((item: string) => {
        return <TagItem key={item} tag={item} onRemove={onRemove} />;
      })}
    </TagListBlock>
  );
});

const TagBox = ({ onInsertTags, tagList, onRemoveTag }: TagBoxProps) => {
  const [input, setInput] = useState<string>('');

  const onChange = useCallback<(e: ChangeEvent<HTMLInputElement>) => void>(
    (e) => {
      const { target } = e;
      setInput(target.value);
    },
    [],
  );

  const onSubmit = useCallback<(e: FormEvent<HTMLFormElement>) => void>(
    (e) => {
      e.preventDefault();
      onInsertTags(input.trim());
      setInput('');
    },
    [input, onInsertTags],
  );

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요"
          onChange={onChange}
          value={input}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={tagList} onRemove={onRemoveTag} />
    </TagBoxBlock>
  );
};

export default TagBox;
