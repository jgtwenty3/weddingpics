import { ID , Query} from "appwrite";
import { INewPost, IUpdatePost,  INewComment, IUpdateComment,  } from "../../types";
import { appwriteConfig, databases, storage } from "./config";


export async function createPost(post: INewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        
       
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
       
      }
    );

   

    return newPost;
  } catch (error) {
    console.log(error);
  }
}
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId:string){
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.postCollectionId,
      postId
    )
    return post;
    
  } catch (error) {
    console.log(error)
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        
      }
    );

    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      throw Error;
    }

    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export  async function deletePost(postId:string, imageId: string){
  if(!postId || !imageId) throw Error;

  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
       postId
    )
    return {status:'ok'}
  } catch (error) {
    console.log(error)
  }

}

export  async function getInfinitePosts({pageParam}: {pageParam: number}){
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]

  if (pageParam){
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    )
    if(!posts) throw Error;

    return posts;
    
  } catch (error) {
    console.log(error)
  }
}
export  async function searchPosts(searchTerm:string){

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('caption', searchTerm) ]
    )
    if(!posts) throw Error;

    return posts;
    
  } catch (error) {
    console.log(error)
  }
}


export async function createComment(comment: INewComment) {
  try {
    const newComment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentColletionId,
      ID.unique(),
      {
        message: comment.message,
        name: comment.name,
      }
    );
    console.log(newComment, 'new comment');

    return newComment;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create comment'); // Re-throw the error to handle it in the calling function
  }
}


export async function getCommentById(commentId:string){
  try {
    const comment = await databases.getDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.commentColletionId,
      commentId
    )
    return comment;
    
  } catch (error) {
    console.log(error)
  }
}

export async function updateComment(comment: IUpdateComment) {
  
  const updatedComment = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.commentColletionId,
    comment.commentId,
    {
      message: comment.message,
      name: comment.name,

    }
  );



  return updatedComment;

}

export async function getRecentComments() {
  try {
    const comments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.commentColletionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!comments) throw Error;

    return comments;
  } catch (error) {
    console.log(error);
  }
}


