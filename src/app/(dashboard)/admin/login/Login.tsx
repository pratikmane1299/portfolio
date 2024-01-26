"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { env } from "@/env.mjs";
import { useAuthContext } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password should be minimum 8 chars long" }),
});

type LoginFormType = z.infer<typeof loginSchema>;

export default function Login() {
  const { setAuthState } = useAuthContext();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(values: LoginFormType) {
    if (
      values.username === env.NEXT_PUBLIC_ADMIN_USERNAME &&
      values.password === env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setAuthState({ loggedIn: true });
      await router.push("/admin/blog-analytics");
    } else {
      toast({ title: "Invalid username or password" });
    }
  }

  return (
    <div className="h-screen ">
      <div className="flex items-center justify-center h-full">
        <div className="w-[350px] h-auto rounded-md bg-dracula-darker-800">
          <div className="flex flex-col p-6">
            <span className="mb-5 text-xl font-semibold">Welcome Back</span>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(handleLogin)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username">Username</Label>
                      <FormControl>
                        <Input type="text" {...field} />
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
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex justify-end">
                  <Button type="submit" variant="default">
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
