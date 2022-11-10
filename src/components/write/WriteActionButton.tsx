import styled from '@emotion/styled';
import Button from '../base/Button';

export interface WriteActionButtonProps {
  onCancel: () => void;
  onPublish: () => void;
  isEdit?: boolean;
}

const WriteActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButton = ({
  onCancel,
  onPublish,
  isEdit,
}: WriteActionButtonProps) => {
  console.log(isEdit);
  return (
    <WriteActionButtonBlock>
      <StyledButton cyan fullwidth={false} onClick={onPublish}>
        {`포스트 ${isEdit ? '수정' : '등록'}`}
      </StyledButton>
      <StyledButton cyan={false} fullwidth={false} onClick={onCancel}>
        취소
      </StyledButton>
    </WriteActionButtonBlock>
  );
};

export default WriteActionButton;
