import React, { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react.query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils/utils';
import CommentForm from '../forms/CommentForm';

type PostStatsProps = {
  post: Models.Document | undefined;
  userId: string;
  postId: string;
};

const PostStats = ({ post, userId}: PostStatsProps) => {
  if (!post) {
    return null;
  }
  
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
 

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  
  useEffect(() => {
    if (currentUser) {
      setIsSaved(!!savedPostRecord);
    }
  }, [currentUser]);
  
  const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    let likesArray = [...likes];
    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }
    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }
    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const handleCommentClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    setShowCommentInput(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div>
        <img
          src="/assets/icons/chat2-icon.svg"
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleCommentClick(e)}
        />
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>

      {showCommentInput && (
        <div className="mt-2">
          <CommentForm
            comment={post}
            postId ={post.id}
            userId = {userId}
            action="Create"  
          />
        </div>
      )}
    </div>
  );
};

export default PostStats;
