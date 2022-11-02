import { useCallback, useEffect } from 'react';
import Editor from '../../components/write/Editor';
import { useAppDispatch, useAppSelector } from '../../features';
import {
  changeField,
  ChangeFieldActionPayload,
  initialize,
} from '../../features/writeSlice';

const EditorContainer = () => {
  const dispatch = useAppDispatch();
  const { title, body } = useAppSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback<(e: ChangeFieldActionPayload) => void>(
    (value) => {
      dispatch(changeField(value));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor title={title} body={body} onChangeField={onChangeField} />;
};

export default EditorContainer;
