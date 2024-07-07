export type IContextType = {

  isLoading: boolean;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  
  export type INewPost = {
    caption: string,
    file: File[];
    
  };

  export type INewComment ={
    message: string;
    name: string;
    
  }
  
  export type IUpdatePost = {
    postId: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    caption:string;
   
  };

  export type IUpdateComment ={
    message: string; 
    name:string;
    commentId:string
    
  };

 

  
  