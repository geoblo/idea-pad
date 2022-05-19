import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { darken } from 'polished';
import { toast } from 'react-toastify';

import { changeMode, selectMode, write } from '../features/memo/memoSlice';
import NewsList from './NewsList';

import { 
  FaRegNewspaper as NewsIcon
} from "react-icons/fa";

const MemoWriteWrapper = styled.div`
  /* height: 100vh; */
  padding: 1.5rem;
`;

const TitleInput = styled.input`
  width: 100%;
  border: ${props => props.validate ? 'none' : '2px solid'};
  border-color: ${props => props.validate ? undefined : '#ed5858'};
  box-shadow: ${props => props.validate ? undefined : 'inset 0 0 0 2px #ed5858'};
  transition: border-color .5s ease-in-out, box-shadow .5s ease-in-out;
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
  border: ${props => props.validate ? 'none' : '2px solid'};
  border-color: ${props => props.validate ? undefined : '#ed5858'};
  box-shadow: ${props => props.validate ? undefined : 'inset 0 0 0 2px #ed5858'};
  transition: border-color .25s ease-in-out, box-shadow .25s ease-in-out;
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
  const [showNews, setShowNews] = useState(false);
  const [validate, setValidate] = useState({
    title: true,
    desc: true
  });

  useEffect(() => {
    dispatch(changeMode('WRITE'));
  }, [dispatch]);

  const handleChangeForm = useCallback(e => {
    setForm(form => ({
      ...form,
      [e.target.name]: e.target.value
    }));

    if (e.target.value) {
      setValidate(validate => ({
        ...validate,
        [e.target.name]: true
      }));
    } else {
      setValidate(validate => ({
        ...validate,
        [e.target.name]: false
      }));
    }
  }, []);

  const handleClearForm = useCallback(e => {
    setForm({
      title: '',
      desc: ''
    });
  }, []);

  useEffect(() => {
    if (mode === 'SAVE') {
      if (!form.title) {
        setValidate(validate => ({
          ...validate,
          title: false
        }));
        toast.error('제목을 입력하세요!');
        dispatch(changeMode('WRITE'));
        return;
      }
      if (!form.desc) {
        setValidate(validate => ({
          ...validate,
          desc: false
        }));
        toast.error('내용을 입력하세요!');
        dispatch(changeMode('WRITE'));
        return;
      }

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

  const handleShowNews = useCallback(() => {
    setShowNews(true);
  }, []);

  const handleHideNews = useCallback(() => {
    setShowNews(false);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {showNews && 
        <NewsList
          handleHideNews={handleHideNews}
          setForm={setForm}
        />
      }
      <MemoWriteWrapper>
        <TitleInput
          name="title"
          value={form.title || ''}
          placeholder="제목 입력"
          validate={validate.title}
          onChange={handleChangeForm}
        />
        <DescTextarea
          name="desc"
          rows={25}
          value={form.desc || ''}
          placeholder="내용 입력"
          validate={validate.desc}
          onChange={handleChangeForm}
        />
        <div style={{ textAlign: 'right' }}>
          <StyledNewsIcon onClick={handleShowNews} />
        </div>
      </MemoWriteWrapper>
    </div>
  );
}

export default React.memo(MemoWrite);