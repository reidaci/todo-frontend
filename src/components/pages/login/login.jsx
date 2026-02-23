import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";

import { LoginSchema } from "@/components/schema/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginUser } from "@/services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setServerError(null);
    try {
      await loginUser(values);
      navigate("/tasks");
    } catch (error) {
      const message =
        error?.data?.error?.message ||
        error?.data?.message ||
        "Login failed. Please check your credentials.";
      setServerError(message);
    }
  }

  return (
    <section className="flex flex-row max-w-7xl min-h-screen w-full justify-center items-center">
      <div className="w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Welcome back! Login to your account
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {serverError && (
                  <p className="text-sm text-red-500 mt-2">{serverError}</p>
                )}
              </CardContent>
              <CardFooter className="flex flex-row justify-between">
                <p className="basis-1/2">
                  Don't have an account?{" "}
                  <Link className="text-blue-500 hover:text-blue-700" to="/signup">
                    Signup Here
                  </Link>
                </p>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
