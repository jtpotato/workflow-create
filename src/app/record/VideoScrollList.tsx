import Video from "./Video";

function VideoScrollList(props: {
  videos: any;
  deleteVideo: (url: string) => void;
}) {
  return (
    <div className="flex flex-row justify-center flex-nowrap space-x-4 overflow-x-scroll w-screen">
      {props.videos.map((url, i) => (
        <Video
          key={i}
          src={url}
          index={i}
          className="flex-shrink-0 w-64"
          onDelete={() => props.deleteVideo(url)}
        />
      ))}
    </div>
  );
}

export default VideoScrollList;
