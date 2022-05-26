import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { BsPencilSquare as WriteIcon } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectMode } from "../features/memo/memoSlice";
import { darken } from "polished";

const MemoFooterWrapper = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
`;

const StyledWriteIcon = styled(WriteIcon)`
  font-size: 1.25rem;
  position: absolute;
  top: 12px;
  right: 24px;
  color: ${props => props.theme.button};
  cursor: pointer;

  &:hover {
    color: ${props => darken(0.2, props.theme.button)};
  }
`;

function MemoFooter({ count }) {
  const mode = useSelector(selectMode);

  return (
    <MemoFooterWrapper>
      <span>{count} 개의 메모</span>
      {mode === 'LIST' && 
        <Link to="/idea-pad/write">
          <StyledWriteIcon />
        </Link>
      }
    </MemoFooterWrapper>
  );
}

export default React.memo(MemoFooter);