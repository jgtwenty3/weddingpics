import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
// import { multiFormatDateString } from '../../lib/utils/utils';

type CommentCardProps = {
  comment: Models.Document;
}



const CommentCard = ({comment}: CommentCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
        

          <div className="flex flex-col">
            <div className="flex-center gap-2 text-light-3">
              {/* <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(comment.$createdAt)}
              </p>
         */}
         <p>{comment.message}</p>
         <p>{comment.name}</p>
        
            </div>
          </div>
        </div>

       
      </div>

      {/* <Link to={`/post-pic`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{comment.message}</p>
        </div>
        <div className="small-medium lg:base-medium py-5">
          <p>{comment.name}</p>
        </div>

        
      </Link> */}

      
    </div>
  );
}

export default CommentCard