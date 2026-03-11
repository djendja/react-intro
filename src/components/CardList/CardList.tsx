import { useEffect, useEffectEvent, useState } from "react";

import {
  Form,
  NavLink,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "react-router";
import { CardContent, Pagination, TextField, Typography } from "@mui/material";
import { Card as MUICard } from "@mui/material";
import type { PaginatedResponse, PostProps } from "../../api/Api.models";
import { SortControl } from "../SortControl/SortControl";
import BasicPagination from "../Pagination/Pagination";

function CardList() {
  const {data: posts, pages} = useLoaderData() as PaginatedResponse<PostProps>;
  const actionData = useActionData();
  const [, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [views, setViews] = useState(0);

  const resetFields = useEffectEvent(() => {
    setTitle("");
    setViews(0);
  });

  useEffect(() => {
    if (actionData?.success) {
      resetFields();
    }
  }, [actionData]);

  // const handleSearch = (query: string) => {
  //   setSearchParams((prev) => {
  //     if (query.trim()) {
  //       prev.set("q", query.trim());
  //     } else {
  //       prev.delete("q");
  //     }
  //     return prev;
  //   });
  // };

  const updateFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      if(value.trim()) {
        prev.set(key, value)
      }
      else {
        prev.delete(key)
      }
      return prev;
    })
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        type="text"
        label="Search by title"
        name="q"
        sx={{ marginTop: "20px" }}
        onChange={(e) => updateFilter('q', e.currentTarget.value)}
      />
      <TextField
        type="text"
        label="Min views"
        name="views_gte"
        sx={{ marginTop: "20px" }}
        onChange={(e) => updateFilter('views_gte', e.currentTarget.value)}
      />
      <TextField
        type="text"
        label="Max views"
        name="views_lte"
        sx={{ marginTop: "20px" }}
        onChange={(e) => updateFilter('views_lte', e.currentTarget.value)}
      />
      <SortControl />
      {posts?.map((post) => {
        return (
          <NavLink
            style={{ width: "50%" }}
            key={post.id}
            to={`/posts/${post.id}`}
          >
            <MuiCard title={post.title} views={post.views} />
          </NavLink>
        );
      })}
      <BasicPagination count={pages}/>
      <Form method="post" action="/posts">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        {actionData?.error && (
          <p style={{ color: "red", margin: "8px 0" }}>{actionData.error}</p>
        )}
        <input
          type="number"
          name="views"
          value={views}
          onChange={(e) => setViews(+e.currentTarget.value)}
        />
        <button type="submit">Submit</button>
        {actionData?.success && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            Post created successfully!
          </p>
        )}
      </Form>
    </div>
  );
}

interface CardProps {
  title: string;
  views: number;
}

const MuiCard = ({ title, views }: CardProps) => {
  return (
    <MUICard sx={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {views}
        </Typography>
      </CardContent>
    </MUICard>
  );
};

export default CardList;
