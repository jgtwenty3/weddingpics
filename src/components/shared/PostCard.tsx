
import { multiFormatDateString } from '../../lib/utils/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';


type PostCardProps ={
    post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
   
  
    return (
      <div className="post-card">
        <div className="flex-between">
          <div className="flex items-center gap-3">
          
  
            <div className="flex flex-col">
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular ">
                  {multiFormatDateString(post.$createdAt)}
                </p>
          
          
              </div>
            </div>
          </div>
  
         
        </div>
  
        <Link to={`/posts/${post.$id}`}>
          <div className="small-medium lg:base-medium py-5">
          photo taken by:<p>{post.caption}</p>
          </div>
  
          <img
            src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="post image"
            className="post-card_img"
          />
        </Link>
  
        
      </div>
    );
  };
  
  export default PostCard;