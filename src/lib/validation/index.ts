import * as z from "zod";

// export const SignupValidation = z.object({
//     name: z.string().min(2, {message:'Too short'}),
//     username: z.string().min(2, {message:'Too Short'}),
//     email: z.string().email(),
//     password: z.string().min(8, {message: 'Password has to be 8 characters'}),
//   });

//   export const SigninValidation = z.object({
//     email: z.string().email(),
//     password: z.string().min(8, {message: 'Password has to be 8 characters'}),
//   });

  // export const ProfileValidation = z.object({
  //   file: z.custom<File[]>(),
  //   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  //   username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  //   email: z.string().email(),
  //   bio: z.string(),
  // });


  export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 characters" }).optional(),
    file: z.custom<File[]>(),
  });

  export const CommentValidation = z.object({
    name: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
    message: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
    })