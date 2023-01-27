import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Video, Videos } from "./";
import { fetchfromapi } from "../utils/fetchfromapi";

const VideoDetail = () => {
  const [videoDetail, setvideoDetail] = useState(null);
  const [videos, setVideo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchfromapi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setvideoDetail(data.items[0])
    );
    fetchfromapi(`search?part=snippet&relatedToVideo=${id}&type=video`).then(
      (data) => setVideo(data.items)
    );
  }, [id]);
  console.log(videoDetail);
  if (!videoDetail?.snippet) return "Loading....";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount, commentCount },
  } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="Bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#ffff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                <VisibilityOutlinedIcon sx={{ fontSize:22,color:'gray',justifyContent:'center' }}/> &nbsp; 
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                <ThumbUpAltOutlinedIcon sx={{ fontSize:22,color:'gray',justifyContent:'center' }}/> &nbsp;
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                <CommentOutlinedIcon sx={{ fontSize:22,color:'gray',justifyContent:'center' }}/> &nbsp;
                  {parseInt(commentCount).toLocaleString()} Comments
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
