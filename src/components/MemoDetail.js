import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from "polished";

import { changeMode, getMemoById, modify, remove, selectAll } from '../features/memo/memoSlice';

import { FaRegTrashAlt as TrashIcon } from "react-icons/fa";

const MemoDetailWrapper = styled.div`
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

const StyledTrashIcon = styled(TrashIcon)`
  font-size: 1.25rem;
  color: ${props => props.theme.button};
  cursor: pointer;

  &:hover {
    color: ${props => darken(0.2, props.theme.button)};
  }
`;

function MemoDetail(props) {
  const { mode, memoDetail } = useSelector(selectAll);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    desc: ''
  });

  useEffect(() => {
    dispatch(changeMode('MODIFY'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMemoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setForm({
      title: memoDetail.title,
      desc: memoDetail.desc
    });
  }, [memoDetail]);

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
        id: memoDetail.id,
        title: form.title,
        desc: form.desc,
        fixed: memoDetail.fixed
      };

      dispatch(modify(newMemo));
      handleClearForm();
      navigate('/', { replace: true });
    }
  }, [dispatch, form, handleClearForm, memoDetail, mode, navigate]);

  const handleRemove = useCallback(() => {
    // TO-DO: 추후 모달 하나 추가 필요
    dispatch(remove(memoDetail.id));
    navigate('/', { replace: true });
  }, [dispatch, memoDetail.id, navigate]);

  return (
    <MemoDetailWrapper>
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
        <StyledTrashIcon onClick={handleRemove} />
      </div>
    </MemoDetailWrapper>
  );
}

export default React.memo(MemoDetail);