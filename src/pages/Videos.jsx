import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import { fetchFromApi } from "../api/fetchFromApi";

function Videos({}) {
  const [category, setCategory] = useState("1");
  const [changeVideos, setChangeVideos] = useState([]);

  // onSelect: category값을 업데이트하는 함수
  // 그리고 category와 onSelect함수를 props로 전달
  // Categories.js에서 onSelect함수를 onClick으로 설정
  const onSelect = useCallback((category) => setCategory(category), []);

  /////////////////////////////////////////////////////////////////

  useEffect(() => {
    fetchFromApi(
      `videos?part=snippet&chart=mostPopular&maxResults=25&regionCode=kr&videoCategoryId=${category}`
    ).then((data) => setChangeVideos(data.items));
  }, [category]);

  return (
    <FlexContainer>
      <Categories
        category={category}
        setCategory={setCategory}
        onSelect={onSelect}
      />
      <GridContainer>
        {changeVideos.map((video) => (
          <VideoCard key={video.id} video={video} changeVideos={changeVideos} />
        ))}
      </GridContainer>
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  padding: 2rem 3rem 0rem 6rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const GridContainer = styled.ul`
  display: Grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gird-template-rows: 100px auto;
  gap: 0.5rem;
  row-gap: 1rem;

  ${({ theme }) => theme.device.xxl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  ${({ theme }) => theme.device.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.device.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.device.md} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const CategorySection = styled.div`
  grid-area: category;
`;

const VideoSection = styled.div`
  grid-area: video;
`;

export default Videos;
