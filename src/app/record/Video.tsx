function Video(props: {
  index: number;
  onDelete: () => void;
  className: string | undefined;
  src: string | undefined;
}) {
  return (
    <div className={props.className}>
      <video
        src={props.src}
        controls
        className={"rounded-lg border-2 border-neutral-700"}
      />
      <div className="flex flex-row space-x-4 items-center">
        <p className="text-neutral-500 text-xs">{props.index}</p>
        <button onClick={props.onDelete} className="rounded-full">
          <p className="text-neutral-500 text-xs underline">Delete</p>
        </button>
      </div>
    </div>
  );
}

export default Video;
