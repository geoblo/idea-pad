import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import { changeMode, selectMode } from "../features/memo/memoSlice";
import { useNavigate } from 'react-router-dom';
import { darken } from "polished";

const MemoHeaderWrapper = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  border-bottom: 1px solid gray;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const SaveButton = styled.span`
  cursor: pointer;
  font-size: 1.25rem;
  color: ${props => props.theme.button};

  &:hover {
    color: ${props => darken(0.2, props.theme.button)};
  }

  & + & {
    margin-left: 1.5rem;
  }
`;

function MemoHeader(props) {
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveMemo = useCallback(() => {
    dispatch(changeMode('SAVE'));
  }, [dispatch]);

  const handleCancelMemo = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <MemoHeaderWrapper>
      <span>메모</span>
      {(mode === 'WRITE' || mode === 'MODIFY') && 
        <div>
          <SaveButton onClick={handleCancelMemo}>취소</SaveButton>
          <SaveButton onClick={handleSaveMemo}>저장</SaveButton>
        </div>
      }
    </MemoHeaderWrapper>
  );
}

export default React.memo(MemoHeader);