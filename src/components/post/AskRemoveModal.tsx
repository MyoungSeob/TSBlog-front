import AskModal from '../common/AskModal';

export interface AskRemoveModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AskRemoveModal = ({
  onCancel,
  onConfirm,
  visible,
}: AskRemoveModalProps) => {
  return (
    <AskModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title={'포스트 삭제'}
      description="포스트를 정말 삭제하시겠습니까?"
      confirmText="삭제"
      cancelText="취소"
    />
  );
};

export default AskRemoveModal;
