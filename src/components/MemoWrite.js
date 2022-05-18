import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { changeMode, selectMode, write } from '../features/memo/memoSlice';

const MemoWriteWrapper = styled.div`
  height: 100vh;
  padding: 1.5rem;
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 1.25rem;
  background: ${props => props.theme.memoBg};
  color: white;
  padding: 0.5rem;

  ::placeholder {
    color: white;
    opacity: 1;
  }
`;

const DescTextarea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: ${props => props.theme.memoBg};
  color: white;
  font-weight: 300;
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 0.5rem;

  ::placeholder {
    color: white;
    opacity: 1;
  }
`;

function MemoWrite(props) {
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    desc: ''
  });

  useEffect(() => {
    dispatch(changeMode('WRITE'));
  }, [dispatch]);

  const handleChangeForm = useCallback(e => {
    setForm(form => ({
      ...form,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleClearForm = useCallback(e => {
    setForm({
      title: '',
      desc: ''
    });
  }, []);

  useEffect(() => {
    if (mode === 'SAVE') {
      const newMemo = {
        id: uuidv4(),
        title: form.title,
        desc: form.desc,
        fixed: false
      };

      dispatch(write(newMemo));
      handleClearForm();
      navigate('/', { replace: true });
    }
  }, [dispatch, mode, form, handleClearForm, navigate]);

  return (
    <MemoWriteWrapper>
      <TitleInput
        name="title"
        value={form.title || ''}
        placeholder="제목 입력"
        onChange={handleChangeForm}
      />
      <DescTextarea
        name="desc"
        rows={25}
        value={form.desc || ''}
        placeholder="내용 입력"
        onChange={handleChangeForm}
      />
    </MemoWriteWrapper>
  );
}

export default React.memo(MemoWrite);