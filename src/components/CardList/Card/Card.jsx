import { useEffect, useRef, useState } from "react";
import { deletePost } from "../../../api/Api";
import Button from "@mui/material/Button";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import "./card.scss";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";

const Card = () => {
  const [edit, setEdit] = useState(false);
  const editedTitleRef = useRef(null);
  const navigate = useNavigate();

  const data = useLoaderData();
  // const postID = useParams();
  // console.log(postID.id);

  const actionData = useActionData();
  const { title, views, id } = data;

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate(-1);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  if (actionData?.success && edit) {
    setEdit(false);
  }

  useEffect(() => {
    if (edit) {
      console.log(editedTitleRef.current);

      editedTitleRef.current.focus();
    }
  }, [edit]);

  const handleClickEdit = () => {
    setEdit(true);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {edit ? (
        <Form method="PUT" action={`/posts/${id}`}>
          <input
            type="text"
            name="title"
            defaultValue={title}
            ref={editedTitleRef}
          />
          <input type="number" name="views" defaultValue={views} />
          <button type="submit">Apply</button>
        </Form>
      ) : (
        <>
          <h2>{title}</h2>
          {actionData?.error && (
            <p style={{ color: "red", margin: "8px 0" }}>{actionData.error}</p>
          )}
          <p>Views: {views}</p>
          {actionData?.success && (
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
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default Card;
