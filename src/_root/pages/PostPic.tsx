
import PostForm from '../../components/forms/PostForm';

const PostPic = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full font-gangsta">Share a picture!</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
}

export default PostPic