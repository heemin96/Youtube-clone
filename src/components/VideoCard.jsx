import React from "react";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function VideoCard({ video, type, list }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, { state: { video: video } }); // 두번재 인자는 부가적인 객체
        window.location.reload();
      }}
    >
      <img
        style={{ width: "100%", borderRadius: "1rem" }}
        src={thumbnails.medium.url}
        alt={title}
      />

      <div>
        <Title> {title} </Title>
        <ChannelTitile>{channelTitle}</ChannelTitile>
        <FormatAgo>{formatAgo(publishedAt, "ko")}</FormatAgo>
      </div>
      {/* 
      {list.map((c) => (
        <img
          style={{ width: "100%", borderRadius: "1rem" }}
          src={thumbnails.medium.url}
          alt={title}
        />
      ))} */}
    </li>
  );
}

const Title = styled.p`
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  z-index: -100;
`;

const ChannelTitile = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  opacity: 0.8;
  z-index: -100;
`;

const FormatAgo = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  opacity: 0.8;
  z-index: -100;
`;

export default VideoCard;
