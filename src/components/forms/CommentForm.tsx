import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { CommentValidation} from "../../lib/validation";
import { Models } from "appwrite";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useCreateComment, useUpdateComment } from "../../lib/react.query/queriesAndMutations";


type CommentFormProps ={
  comment?:Models.Document;
  action:'Create'|'Update'
  
}

const CommentForm = ({comment, action}: CommentFormProps) => {
  const {mutateAsync: createComment, isPending: isLoadingCreate}= useCreateComment();
  const {mutateAsync: updateComment, isPending: isLoadingUpdate}= useUpdateComment();

  const {toast} = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      message: comment ? comment.message : "",
      name: comment? comment.name: "",
     
    },
  });
     
      async function onSubmit(values: z.infer<typeof CommentValidation>) {
        if(comment && action === 'Update'){
          const updatedPost = await updateComment({
            ...values,
            commentId:comment.$id,
            message:comment?.message,
            name:comment?.name,
          })
          if(!updatedPost){
            toast({title:'Please Try Again'})
          }
          return navigate(`/guestbook/${comment.$id}`)
        }
        const newComment = await createComment({
          ...values,
          
        })

        if (!newComment){
          toast({
            title: 'Please try again'
          })
        }
        navigate('/');
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} 
    className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className = "shad-form_label">Your message to the couple:</FormLabel>
            <FormControl>
              <Textarea className = "shad-textarea custom-scrollbar"{...field} />
            </FormControl>
            <FormMessage className = "shad-form_message"/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className = "shad-form_label">This message is from:</FormLabel>
            <FormControl>
              <Textarea className = "shad-textarea custom-scrollbar"{...field} />
            </FormControl>
            <FormMessage className = "shad-form_message"/>
          </FormItem>
        )}
      />
      
      
   
    <div className = "flex gap-4 items-center justify-end">
          <Button 
            type="button" 
            className="shad-button_dark_4"
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
          {action} Message
        </Button>
    </div>
    </form>
  </Form>
  )
}

export default CommentForm