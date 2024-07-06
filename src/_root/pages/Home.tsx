import Loader from '../../components/shared/Loader';
import PostCard from '../../components/shared/PostCard';
import { useGetRecentPosts } from '../../lib/react.query/queriesAndMutations';
import { Models } from 'appwrite';

const home = () => {
 const {data: posts, isPending: isPostLoading} = useGetRecentPosts();

  return (
    <div className = "flex flex-1">
      <div className = "home-container">
        {/* <div className = "font-gangsta">Not Like Us</div> */}
        <div className = "home-posts">
          
          {isPostLoading && !posts ?(
            <Loader/>
          ):(
            <ul className = "flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post:Models.Document)=>(
                <li>
                  <PostCard post = {post} key = {post.caption}/>
                </li>
              ))}
            </ul>
          )
          } 
        </div>

      </div>

    </div>
  )
}

export default home