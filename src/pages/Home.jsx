import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Videos from "./Videos";
import CategoriesList from "../util/List/CategoriesList";
import axios from "axios";
import { fetchFromApi } from "../api/fetchFromApi";

function Home() {
  const { youtube } = useYoutubeApi();
  const { key } = CategoriesList;
  const queryClient = useQueryClient();

  // const {
  //   isLoading,
  //   error,
  //   data: videos,
  // } = useMutation(["videos", key], () => youtube.Categories(key), {});

  //////////////////카테고리 부분//////////////////////////////////

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

  console.log("changevid", changeVideos);

  return (
    <HomeContainer>
      <NavbarSection>
        <Navbar />
      </NavbarSection>

      <VideoSection>
        <Videos changeVideos={changeVideos} />
      </VideoSection>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: grid;

  grid-template-columns: 10px auto;
  grid-template-areas: //
    "navbar content";

  background-color: rgb(24 24 27);
`;

const NavbarSection = styled.div`
  grid-area: navbar;
`;

const VideoSection = styled.div`
  grid-area: content;
`;

export default Home;
