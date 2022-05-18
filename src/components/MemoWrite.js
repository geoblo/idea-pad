import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { darken } from 'polished';

import { changeMode, selectMode, write } from '../features/memo/memoSlice';
import { useGetHeadlineNewsQuery } from '../services/news';

import { 
  FaRegNewspaper as NewsIcon
} from "react-icons/fa";

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
  margin-bottom: 1rem;
  padding: 0.5rem;

  ::placeholder {
    color: white;
    opacity: 1;
  }
`;

const StyledNewsIcon = styled(NewsIcon)`
  font-size: 1.25rem;
  color: ${props => props.theme.button};
  cursor: pointer;

  &:hover {
    color: ${props => darken(0.2, props.theme.button)};
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

  // TO-DO: 뉴스 컴포넌트 만들면 그 안으로 이동 필요
  const { data, error, isLoading } = useGetHeadlineNewsQuery();
  useEffect(() => {
    console.log(data);
    console.log(error);
    console.log(isLoading);
  }, [data, error, isLoading]);

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

  const handleGetNews = useCallback(() => {
    // 새로운 '뉴스' 컴포넌트를 show?
  }, []);

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
      <div style={{ textAlign: 'right' }}>
        <StyledNewsIcon onClick={handleGetNews} />
      </div>
    </MemoWriteWrapper>
  );
}

export default React.memo(MemoWrite);