import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import { MainLayout } from "../pages/MainLayout/MainLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { getPost, getPosts, postPosts, putPost } from "../api/Api";
import { lazy, Suspense } from "react";
import type { PaginatedResponse, PostFilters, PostProps } from "../api/Api.models";

const postsLoader = async ({ request }: LoaderFunctionArgs): Promise<PaginatedResponse<PostProps>> => {
  const url = new URL(request.url);
  // const query = url.searchParams.get("q") || "";
  const searchParams = url.searchParams;

  const filters: PostFilters = {
    q: searchParams.get("q") ?? undefined,
    views_gte: searchParams.get("views_gte") ? Number(searchParams.get("views_gte")) : undefined,
    views_lte: searchParams.get("views_lte") ? Number(searchParams.get("views_lte")) : undefined,
    _sort: searchParams.get("_sort") ?? undefined,
    _order: (searchParams.get("_order") as 'asc' | 'desc') ?? undefined,
    _page: searchParams.get("_page") ? Number(searchParams.get("_page")) : 1,
    _limit: 3
  }

  try {
    const posts = await getPosts(filters);
    return posts;
  } catch (error) {
    console.log("error", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const postDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<PostProps> => {
  try {
    const post = await getPost(params.id);
    return post;
  } catch (error) {
    console.log("error", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const createPostAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title")?.toString().trim();
  const views = Number(formData.get("views")) || 0;

  try {
    const newPost = await postPosts({ title, views });
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

const Card = lazy(() => import("../components/CardList/Card/Card"));
const CardList = lazy(() => import("../components/CardList/CardList"));

export const router = createBrowserRouter([
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
        loader: postsLoader,
        action: createPostAction,
      },
      {
        path: "posts/:id",
        element: (
          <Suspense fallback={<div>Loading post details...</div>}>
            <Card />
          </Suspense>
        ),
        loader: postDetailLoader,
        action: updatePostAction,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);
