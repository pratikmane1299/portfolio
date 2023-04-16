type TagPropsType = {
  tag: string;
};

function Tag({ tag }: TagPropsType) {
  return (
    <span className="px-1.5 py-1 md:px-2 md:py-1.5 bg-dracula-dark-600 rounded md:rounded-md text-xs text-white tracking-wide font-normal">
      {tag}
    </span>
  );
}

export default Tag;
