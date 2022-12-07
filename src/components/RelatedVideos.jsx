import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import VideoCard from "./VideoCard";

const RelatedVideos = ({ id }) => {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["related", id], () => youtube.relatedVideos(id));
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type='list'/>
          ))}
        </ul>
      )}
    </>
  );
};


export default RelatedVideos;
