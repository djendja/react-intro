import { useEffect, useRef, useState } from "react";
import { deletePost, putPost } from "../../../api/Api";
import Button from "@mui/material/Button";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import "./card.scss";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postDetailQuery } from "../../../queries/postQueries";

const Card = () => {
  const [edit, setEdit] = useState(false);
  const editedTitleRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(postDetailQuery(id));
  const { title, views } = data || {};
  const queryClient = useQueryClient();

  useEffect(() => {
    if (edit) {
      console.log(editedTitleRef.current);

      editedTitleRef.current?.focus();
    }
  }, [edit]);

  const { mutate: handleUpdate, isSuccess, isError } = useMutation({
    mutationFn: ({title, views}: {title: string, views: number}) => putPost(id, {title, views}),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts"]});
        queryClient.invalidateQueries({queryKey: ["post", id]})
        setEdit(false);
    }
  })

  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts"]});
        navigate(-1)
    }
  })

  const handleClickEdit = () => {
    setEdit(true);
  };


  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const title = formData.get("title")?.toString().trim() || "";
    const views = Number(formData.get("views"));

    handleUpdate({title, views})
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            defaultValue={title}
            ref={editedTitleRef}
          />
          <input type="number" name="views" defaultValue={views} />
          <button type="submit">Apply</button>
        </form>
      ) : (
        <>
          <h2>{title}</h2>
          {isError && (
            <p style={{ color: "red", margin: "8px 0" }}>error</p>
          )}
          <p>Views: {views}</p>
          {isSuccess && (
            <p style={{ color: "green", marginTop: "1rem" }}>
              Post updated successfully!
            </p>
          )}
          <Button
            variant="contained"
            onClick={handleClickEdit}
            color="warning"
            classes={{ root: "btn-primary" }}
            startIcon={<ModeEditOutlineOutlinedIcon />}
          >
            Edit
          </Button>
          <Button variant="contained" onClick={() => handleDelete()}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default Card;
