import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";
import { darken } from 'polished';
import { useGetHeadlineNewsQuery } from '../services/news';
import NewsItem from './NewsItem';

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

function NewsList({ handleHideNews, setForm }) {
  const { data, error, isLoading } = useGetHeadlineNewsQuery();
  
  useEffect(() => {
    console.log(data);
    console.log(error);
    console.log(isLoading);
  }, [data, error, isLoading]);

  const handleClipNews = useCallback((title, url) => {
    setForm(form => ({
      ...form,
      desc: `${form.desc}[${title.substr(0, 20)}...]: ${url}`
    }));

    handleHideNews();
  }, [setForm, handleHideNews]);

  // TO-DO: 검색창 만들어서 뉴스 검색 기능!

  if (isLoading) return <NewsListWrapper>뉴스 불러 오는 중...</NewsListWrapper>;

  return (
    <NewsListWrapper className='animate__animated animate__slideInUp custom-scroll'>
      <div style={{ textAlign: 'right' }}>
        <StyledCloseIcon onClick={handleHideNews} />
      </div>
      {data.articles.map(article => (
        <NewsItem 
          key={article.url}
          article={article}
          handleClipNews={handleClipNews}
        />
      ))}
    </NewsListWrapper>
  );
}

export default NewsList;