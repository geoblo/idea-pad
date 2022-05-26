import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { fixed, changeMode, getMemo } from "../features/memo/memoSlice";

import { BsPinFill as PinIcon } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { selectMemoList } from './../features/memo/memoSlice';

const MemoListWrapper = styled.div`
  height: 100vh;
  padding: 1.5rem;
  overflow-y: overlay;
`;

const FixedMemoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MemoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  width: 31%;
`;

const MemoBox = styled.div`
  height: 100px;
  
  background: ${props => props.theme.memoBg};;
  border-radius: 6px;
  padding: .5rem;

  font-size: 12px;
  cursor: pointer;

  span {
    width: 120px;
    height: 60px;
    display: inline-block;
    overflow: hidden;
  }

  &:hover {
    border: 2px solid pink;
  }
`;

function MemoList() {
  const memos = useSelector(selectMemoList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemo());

    try {
      // async function fetchData() {
      // dispatch(fetchMemo()).unwrap();
      // }
      // fetchData();

      // handle result here
      // console.log(memos);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeMode('LIST'));
  }, [dispatch]);

  const handleToggleFixed = useCallback((e, id) => {
    e.preventDefault();
    dispatch(fixed(id));
  }, [dispatch]);

  return (
    <MemoListWrapper className='custom-scroll'>
      <p style={{ marginBottom: '0.5rem' }}>고정된 메모</p>
      <FixedMemoContainer>
        {memos && memos.filter(memo => memo.fixed === true).map(memo =>
          <StyledLink key={memo.id} to={`/idea-pad/detail/${memo.id}`}>
            <MemoBox>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{memo.title}</p>
                <PinIcon size="0.8rem" color="#ffd43b" onClick={e => handleToggleFixed(e, memo.id)} />
              </div>
              <hr />
              <span>{memo.desc}</span>
            </MemoBox>
          </StyledLink>)
        }
      </FixedMemoContainer>
      <p style={{ marginBottom: '0.5rem' }}>메모</p>
      <MemoContainer>
        {memos && memos.filter(memo => memo.fixed === false).map(memo => 
          <StyledLink key={memo.id} to={`/idea-pad/detail/${memo.id}`}>
            <MemoBox>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{memo.title}</p>
                <PinIcon size="0.8rem" onClick={e => handleToggleFixed(e, memo.id)} />
              </div>
              <hr />
              <span>{memo.desc}</span>
            </MemoBox>
          </StyledLink>)
        }
      </MemoContainer>
    </MemoListWrapper>
  );
}

export default React.memo(MemoList);