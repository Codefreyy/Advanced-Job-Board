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
import { loginSchema } from "@backend/constants/schemas/users"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { AxiosError } from "axios"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

type LoginValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  })

  const { login, user } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(values: LoginValues) {
    await login(values.email, values.password).catch((error) => {
      if (
        error instanceof AxiosError &&
        error.response?.data.message !== null
      ) {
        form.setError("root", { message: error.response?.data.message })
      }
    })

    console.log("login", user)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1">
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
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/signUp")}
          >
            Sign up
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : "Login In"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
