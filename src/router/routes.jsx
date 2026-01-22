import { createBrowserRouter } from "react-router";
import { MainLayout } from "../pages/MainLayout/MainLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { getPost, getPosts, postPosts, putPost } from "../api/Api";
import { lazy, Suspense } from "react";

const postsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  try {
    const posts = await getPosts(query);
    return posts;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

const postDetailLoader = async ({ params }) => {
  try {
    const post = await getPost(params.id);
    return post;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

const createPostAction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title").toString().trim();
  const views = Number(formData.get("views")) || 0;

  try {
    const newPost = await postPosts({ title, views });
    return { success: true, newPost };
  } catch (error) {
    console.log(error);
  }
};

const updatePostAction = async ({ params, request }) => {
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
