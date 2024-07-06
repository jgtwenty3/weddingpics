import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    UseMutationResult
  
} from '@tanstack/react-query';
import {  createPost, getRecentPosts, getPostById, getInfinitePosts, searchPosts, updatePost, createComment, updateComment } from '../appwrite/api';
import { INewComment, INewPost, IUpdateComment, IUpdatePost } from '../../types';
import { QUERY_KEYS } from './queryKeys';
import { Models } from 'appwrite';



 

export const useCreatePost = (): UseMutationResult<Models.Document | undefined, Error, INewPost, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () =>{
  return(
    useQuery({
      queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    })
  )
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post:IUpdatePost) => updatePost(post),
    onSuccess: (data) =>{
      queryClient.invalidateQueries({
        queryKey :[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  });
};



export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  });
};


export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any) => {
      if (!lastPage || lastPage.documents.length === 0) {
        return null;
      }
  
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: null, // Set initialPageParam to null
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};



export const useCreateComment = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(comment:INewComment) => createComment(comment),
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENTS],
      });
    },
  });
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment:IUpdateComment) => updateComment(comment),
    onSuccess: (data) =>{
      queryClient.invalidateQueries({
        queryKey :[QUERY_KEYS.GET_COMMENTS_BY_ID, data?.$id]
      })
    }
  });
};



