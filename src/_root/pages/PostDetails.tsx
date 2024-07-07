import Loader from '../../components/shared/Loader';


import { useGetPostById } from '../../lib/react.query/queriesAndMutations';
import { multiFormatDateString } from '../../lib/utils/utils';
import { Link, useParams } from 'react-router-dom';




const PostDetails = () => {

  const {id} = useParams()
  const {data: post, isPending}= useGetPostById(id ?? '') ;

  console.log(post)

  
  

  return (
    <div className = "post_details-container">
      {isPending? <Loader/>:(
        <div className = 'post_details-card'>
          <img
          src = {post?.imageUrl}
          alt = "creator"
          className='post_details-img'
          />
          <div className="post_details-info">
            <div className='flex-between w-full'>
            
           
  
            <div className="flex flex-col">
              
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular ">
                  {multiFormatDateString(post?.$createdAt)}
                </p>
               
              </div>
            </div>
           
            <div className ='flex-center gap-4'>
              
              </div>
            </div>
            <hr className = "border w-full border-dark-4/80"/>
              <div className="flex flex-col flex-1 w-full small-medium lg: base-regular">
              photo taken by:<p>{post?.caption}</p>
                
            </div>
          
        
            
            
          </div>
        </div>
      )}

    </div>
  )
}

export default PostDetails