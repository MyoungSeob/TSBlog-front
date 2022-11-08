import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles';

export interface TagsProps {
  tags: string[];
}

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const Tags = ({ tags }: TagsProps) => {
  return (
    <TagsBlock>
      {tags.map((item) => {
        return (
          <Link className="tag" to={`/?tag${item}`} key={item}>
            #{item}
          </Link>
        );
      })}
    </TagsBlock>
  );
};

export default Tags;
