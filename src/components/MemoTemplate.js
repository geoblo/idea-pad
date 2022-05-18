import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MemoHeader from './MemoHeader';
import MemoFooter from './MemoFooter';
import { selectMemoCount } from './../features/memo/memoSlice';

const MemoTemplateWrapper = styled.div`
  width: 512px;
  height: 768px;
  margin: 0 auto;
  margin-top: 3rem;
  background: #222222;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
`;

function MemoTemplate() {
  const memoCnt = useSelector(selectMemoCount);

  return (
    <MemoTemplateWrapper>
      <MemoHeader />
      {<Outlet />}
      <MemoFooter count={memoCnt} />
    </MemoTemplateWrapper>
  );
}

export default React.memo(MemoTemplate);