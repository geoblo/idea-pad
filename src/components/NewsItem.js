import React from 'react';
import styled from "styled-components";

const NewsItemWrapper = styled.div`
  display: flex;
  margin-top: 1.25rem;
  width: 100%;
  max-height: 100px;
  overflow: hidden;

  .thumbnail {
    margin-right: 1rem;
    cursor: pointer;

    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }

  .contents {
    width: 300px;

    h2 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

      a {
        color: white;
      }
    }

    p {
      margin: 0;
      margin-top: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span {
      line-height: 6;
    }
  }

  & + & {
    margin-top: 1rem;
  }
`;

function NewsItem({ article: { title, description, url, urlToImage }, handleClipNews}) {
  return (
    <NewsItemWrapper>
      {urlToImage &&
        <div className="thumbnail" onClick={() => handleClipNews(title, url)}>
          <img src={urlToImage} alt="thumbnail" />
        </div>
      }
      <div className="contents">
        <h2 onClick={() => handleClipNews(title, url)}>
          {title}
        </h2>
        <p>{description}</p>
        <span>
          <a href={url} target="_blank" rel="noopener noreferrer">뉴스 바로가기 ></a>
        </span>
      </div>
    </NewsItemWrapper>
  );
}

export default React.memo(NewsItem);