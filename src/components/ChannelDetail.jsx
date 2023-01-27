import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box,CardMedia } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { Cover } from "../utils/constants";
import { fetchfromapi } from "../utils/fetchfromapi";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  console.log(channelDetail, videos);
  useEffect(() => {
    fetchfromapi(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
  }, [id]);
  useEffect(() => {
    fetchfromapi(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  return(
    
  <Box minHeight="95vh">
    <Box>
    <CardMedia
          image='../channelBanner.png'
          alt={channelDetail?.snippet?.title}
          sx={{
            zIndex:10,height:'300px',width:'100%'
          }}
          style={{ }}
        />
      {/* <div style={{background:'linear-gradient(to right, #9bc400, #f9c5bd )',zIndex:10,height:'300px',width:'100%' }} /> */}
      <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
    </Box>
    <Box display="flex" p="2">
    <Box sx={{mr:{sm:'120px'}}}/>
    <Videos videos={videos}/>
    </Box>
  </Box>
  )
};

export default ChannelDetail;
