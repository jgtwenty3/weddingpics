import * as z from "zod";
import {useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Button } from "../../components/ui/button";

import { Input } from "../../components/ui/input";
import { SigninValidation } from "../../lib/validation";
import { useSignInAccount } from "../../lib/react.query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";





const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  // Query
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });
      
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again.", });
      
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        {/* <img src="/assets/images/swish-logo.png" alt="logo" /> */}

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 font-cursive">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 font-cursive">
          Welcome back.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label font-cursive">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input font-normal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label font-cursive">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input font-normal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary font-normal">
            {/* {isLoading || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )} */}
            Log In
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2 font-normal">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-red text-small-semibold ml-1 font-normal">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;