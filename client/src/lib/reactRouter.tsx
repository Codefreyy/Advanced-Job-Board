import {
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  Await as AwaitReactRouter,
  AwaitProps as AwaitPropsReactRouter,
} from "react-router-dom"
import { ReactNode } from "react"

// T is a object whose key is string and value is unknown
export function deferredLoader<T extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => T
) {
  return (args: LoaderFunctionArgs) => {
    return defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: T
    }
  }
}

export function useDeferredLoaderData<
  T extends ReturnType<typeof deferredLoader>
>() {
  // The type of T is the return type of the deferredLoader function
  return useLoaderData() as ReturnType<T>["data"]
  // asserts the result as the type of the "data" attribute in the T return value.
}

type AwaitProps<T> = Omit<AwaitPropsReactRouter, "children" | "resolve"> & {
  children: (data: Awaited<T>) => ReactNode
  resolve: Promise<T>
}

export function Await<T>(props: AwaitProps<T>) {
  return <AwaitReactRouter {...props} />
}
