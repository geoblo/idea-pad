import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MemoHeader from './MemoHeader';
import MemoFooter from './MemoFooter';
import { selectMemoCount } from './../features/memo/memoSlice';

const CenterBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemoTemplateWrapper = styled.div`
  width: 512px;
  height: 768px;
  margin: 0 auto;
  /* margin-top: 3rem; */
  background: #222222;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
`;

function MemoTemplate() {
  const memoCnt = useSelector(selectMemoCount);

  return (
    <CenterBox>
      <MemoTemplateWrapper>
        <MemoHeader />
        {<Outlet />}
        <MemoFooter count={memoCnt} />
      </MemoTemplateWrapper>
    </CenterBox>
  );
}

export default React.memo(MemoTemplate);