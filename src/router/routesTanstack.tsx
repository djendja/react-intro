import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import { MainLayout } from "../pages/MainLayout/MainLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { putPost } from "../api/Api";
import { lazy, Suspense } from "react";
import type { PostProps } from "../api/Api.models";
import { postPostsAxios } from "../api/ApiAxios";
import { QueryClient } from "@tanstack/react-query";
import { postDetailQuery, postsQuery } from "../queries/postQueries";

const postsLoader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs): Promise<PostProps[]> => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  return queryClient.ensureQueryData(postsQuery(query));

};

const postDetailLoader = (QueryClient: QueryClient) => async ({ params }: LoaderFunctionArgs): Promise<PostProps> => {
  return QueryClient.ensureQueryData(postDetailQuery(params.id))
};

const createPostAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title")?.toString().trim();
  const views = Number(formData.get("views")) || 0;

  try {
    const newPost = await postPostsAxios({ title, views });
    return { success: true, newPost };
  } catch (error) {
    console.log(error);
  }
};

const updatePostAction = async ({ params, request }: LoaderFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const views = Number(formData.get("views"));

  try {
    const updatedPost = await putPost(params.id, { title, views });
    return { success: true, updatedPost };
  } catch (error) {
    console.log(error);
  }
};

const Card = lazy(() => import("../components/CardList/Card/CardTanstack"));
const CardList = lazy(() => import("../components/CardList/CardListTanstack"));

export const createRouter = (queryClient: QueryClient) => createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "posts",
        element: (
          <Suspense fallback={<div>Loading all posts...</div>}>
            <CardList />
          </Suspense>
        ),
        loader: postsLoader(queryClient),
        // action: createPostAction,
      },
      {
        path: "posts/:id",
        element: (
          <Suspense fallback={<div>Loading post details...</div>}>
            <Card />
          </Suspense>
        ),
        loader: postDetailLoader(queryClient),
        action: updatePostAction,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);
