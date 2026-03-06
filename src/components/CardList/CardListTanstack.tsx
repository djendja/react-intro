import { useState } from "react";

import {
  NavLink,
  useSearchParams,
} from "react-router";
import { CardContent, TextField, Typography } from "@mui/material";
import { Card as MUICard } from "@mui/material";
import type { PostProps } from "../../api/Api.models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postsQuery } from "../../queries/postQueries";
import { postPostsAxios } from "../../api/ApiAxios";

function CardList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [views, setViews] = useState(0);

  const query = searchParams.get("q") || "";

  const { data: posts } = useQuery(postsQuery(query))

  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: postPostsAxios,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts"]});
        setTitle("");
        setViews(0);
    }
  })

  const handleSearch = (query: string) => {
    setSearchParams((prev) => {
      if (query.trim()) {
        prev.set("q", query.trim());
      } else {
        prev.delete("q");
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({title, views})
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        type="text"
        name="q"
        sx={{ marginTop: "20px" }}
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        {isError && (
          <p style={{ color: "red", margin: "8px 0" }}>error</p>
        )}
        <input
          type="number"
          name="views"
          value={views}
          onChange={(e) => setViews(+e.currentTarget.value)}
        />
        <button type="submit">Submit</button>
        {isSuccess && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            Post created successfully!
          </p>
        )}
      </form>
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
