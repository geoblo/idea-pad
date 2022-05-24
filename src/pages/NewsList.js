import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import NewsItem from './NewsItem';
import { useGetNewsByKeywordQuery } from '../services/news';

import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";

const NewsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-y: overlay;

  position: absolute;
  background-color: black;
`;

const StyledCloseIcon = styled(CloseIcon)`
  font-size: 1.5rem;
  color: ${props => props.theme.button };
  cursor: pointer;

  &:hover {
    color: ${props => darken(0.2, props.theme.button)};
  }
`;

const SearchInput = styled.input`
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

function NewsList({ headlineData, handleHideNews, setForm }) {
  const [search, setSearch] = useState('주요');
  const { data, error , isLoading } = useGetNewsByKeywordQuery(search);

  const handleClipNews = useCallback((title, url) => {
    setForm(form => ({
      ...form,
      desc: `${form.desc}[${title.substr(0, 20)}...]: ${url}`
    }));

    handleHideNews();
  }, [setForm, handleHideNews]);

  // const handleChangeSearch = useCallback(e => {
    
  // }, []);

  const handleSearch = useCallback(e => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  }, []);

  return (
    <NewsListWrapper className='animate__animated animate__slideInUp custom-scroll'>
      {error ? (
        <>오류가 발생, 잠시 후 다시 시도해주세요.</>
      ) : isLoading ? (
        <>뉴스 불러 오는 중...</>
      ) : data ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '1rem' }}>
            <SearchInput
              name="search"
              defaultValue={search || ''}
              placeholder="제목 입력"
              // onChange={handleChangeSearch}
              onKeyUp={handleSearch}
            />
            <StyledCloseIcon onClick={handleHideNews} />
          </div>
          {data.articles.map(article => (
            <NewsItem 
              key={article.url}
              article={article}
              handleClipNews={handleClipNews}
            />
          ))}
        </>
      ) : null}
    </NewsListWrapper>
  );
}

export default React.memo(NewsList);