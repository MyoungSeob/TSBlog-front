import styled from '@emotion/styled';
import { ChangeEvent, MutableRefObject, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import palette from '../../lib/styles';
import Responsive from '../common/Responsive';
import { ChangeFieldActionPayload } from '../../features/writeSlice';

export interface EditorProps {
  title: string;
  body: string;
  onChangeField: (e: ChangeFieldActionPayload) => void;
}

const EditorBlock = styled(Responsive)`
  /* 페이지 위아래 여백 지정*/
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;

const Editor = ({ body, onChangeField, title }: EditorProps) => {
  const quillElement = useRef() as MutableRefObject<HTMLDivElement>;
  const quillInstance = useRef<Quill>();
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef<boolean>(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = body;
    }
  }, [body]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeField({ key: 'title', value: e.target.value });
  };
  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요."
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
