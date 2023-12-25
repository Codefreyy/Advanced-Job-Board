import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signupSchema } from "@backend/constants/schemas/users"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

type SignupValues = z.infer<typeof formSchema>

type SignupFormType = {
  email: string
  password: string
  passwordConfirmation: string
}

const formSchema = signupSchema
  .merge(
    z.object({
      passwordConfimation: z.string(),
    })
  )
  .refine(
    (data: SignupFormType) => data.password == data.passwordConfirmation,
    {
      message: "Password do not match",
      path: ["passwordConfirmation"],
    }
  )

export default function SignupForm() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", passwordConfirmation: "" },
  })

  function onSubmit(value: SignupValues) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex gap-2 justify-end">
            <Button type="button" variant="ghost">
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="button" variant="outline">
              <Link to="/login">Login In</Link>
            </Button>
            <Button
              type="submit"
              variant="secondary"
              disabled={form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Sign Up"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
