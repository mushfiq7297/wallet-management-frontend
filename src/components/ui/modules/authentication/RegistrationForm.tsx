

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
import { Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email"),
    phone: z
      .string()
      .regex(
        /^(?:\+8801\d{9}|01\d{9})$/,
        "Enter a valid Bangladeshi phone number"
      ),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export function RegistrationForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate(); // ✅ navigation
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data: RegisterData) => {
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }).unwrap();

      console.log("Registration success:", result);
      toast.success("Account created successfully!");


      setTimeout(() => navigate("/"), 1000);

      form.reset();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
     
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Input id="name" placeholder="John Doe" {...field} />
                  )}
                />
                {form.formState.errors.name && (
                  <FormMessage>{form.formState.errors.name.message}</FormMessage>
                )}
              </Field>

        
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
                  <FormMessage>{form.formState.errors.email.message}</FormMessage>
                )}
              </Field>

       
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      type="text"
                      placeholder="01XXXXXXXXX"
                      {...field}
                    />
                  )}
                />
                {form.formState.errors.phone && (
                  <FormMessage>{form.formState.errors.phone.message}</FormMessage>
                )}
                <FieldDescription>
                  Use Bangladeshi format: 01XXXXXXXXX or +8801XXXXXXXXX
                </FieldDescription>
              </Field>

     
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
                  <FormMessage>{form.formState.errors.password.message}</FormMessage>
                )}
              </Field>

       
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <div className="relative">
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <FormMessage>
                    {form.formState.errors.confirmPassword.message}
                  </FormMessage>
                )}
              </Field>

              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Creating..." : "Create Account"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full mt-2"
                  >
                    Sign up with Google
                  </Button>
                  <FieldDescription className="px-6 text-center mt-2">
                    Already have an account?{" "}
                    <a href="/login" className="underline">
                      Sign in
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
