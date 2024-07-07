import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "../../lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "../../lib/react.query/queriesAndMutations";

import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type PostFormProps = {
  post?:Models.Document;
  action: 'Create' | 'Update';
}

const PostForm = ({post, action}: PostFormProps) => {
  const {mutateAsync: createPost, isPending: isLoadingCreate}= useCreatePost();
  const {mutateAsync: updatePost, isPending: isLoadingUpdate}= useUpdatePost();



  
  const {toast} = useToast();
  const navigate = useNavigate();



  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      
    },
  });
     
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
        caption: post?.caption || "",
      });
      if (!updatedPost) {
        toast({ title: 'Please Try Again' });
      }
      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...values,
      caption: values.caption || "",
    });
  
    if (!newPost) {
      toast({
        title: 'Please try again',
      });
    }
    navigate('/');
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} 
    className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className = "shad-form_label">Posted By</FormLabel>
            <FormControl>
              <Textarea placeholder = "Your Name"className = "shad-textarea custom-scrollbar"{...field} />
            </FormControl>
            <FormMessage className = "shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className = "shad-form_label">Add Photos</FormLabel>
            <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}
                />
            </FormControl>
            <FormMessage className = "shad-form_message"/>
          </FormItem>
        )}
      />
      
      
    
    <div className = "flex gap-4 items-center justify-end">
        <Button 
            type="button" 
            className = "shad-button_dark_4"
            onClick={() => navigate('/')}
            
        >
            Cancel
        </Button>

        <Button 
        type="submit"
        className = "shad-button_primary whitespace-nowrap"
        disabled = {isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate && 'Loading...'}
          {action} Post
        </Button>
    </div>
    </form>
  </Form>
  )
}

export default PostForm