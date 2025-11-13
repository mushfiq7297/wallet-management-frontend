

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form, FormMessage } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom"; 
import z from "zod";
import { useEffect, useState } from "react";


export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginData = z.infer<typeof loginSchema>;


export function LoginForm({
  
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loginUser] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const location = useLocation();

useEffect(() => {
  console.log("Current path:", location.pathname);
}, [location]);


  const onSubmit = async (data: LoginData) => {
    try {
       const result = await loginUser(data).unwrap();
    console.log("Login successful:", result);

    const { accessToken, refreshToken, user } = result.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    toast.success(`Welcome back, ${user.name}!`);
      
       setTimeout(() => {
      const role = user.role?.toLowerCase(); 

      if (role === "admin") navigate("/admin");
      else if (role === "user") navigate("/user");
      else if (role === "agent") navigate("/agent");
      else navigate("/"); 
      console.log("Navigating to:", role);
    }, 1000);
  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Invalid email or password.");
  }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    )}
                  />
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </Field>

                {/* Password */}
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <div className="relative">
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message}
                    </FormMessage>
                  )}
                </Field>

                {/* Submit */}
                <Field>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(`http://localhost:5000/api/v1/auth/google`)
                    }
                    variant="outline"
                    type="button"
                    className="w-full mt-2"
                  >
                    Login with Google
                  </Button>

                  <FieldDescription className="text-center mt-2">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="underline">
                      Sign up
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
