import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 1,
  }); //2번째 인자로 함수 받음 (Axios)

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      {isLoading && <p>로딩중입니다...</p>}
      {error && <p>통신 오류 입니다 😖</p>}
      {videos && (
        <GridContainer>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </GridContainer>
      )}
    </div>
  );
}
const GridContainer = styled.ul`
  display: Grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
  row-gap: 1rem;
  padding: 6rem 7rem;

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

export default Videos;
