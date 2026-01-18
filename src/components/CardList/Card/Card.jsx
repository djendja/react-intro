import { useEffect, useRef, useState } from "react";
import { deletePost, putPost } from "../../../api/Api";
import Button from '@mui/material/Button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import './card.scss';

export const Card = ({ title, views, id, setPosts, posts }) => {
  // const [editedTitle, setEditedTitle] = useState(title);
  // const [editedViews, setEditedViews] = useState(views);
  const [edit, setEdit] = useState(false);
  const editedTitleRef = useRef(null);

  const handleDelete = async (id) => {
    try {
      const data = await deletePost(id);
      const newPosts = posts.filter((post) => post.id !== data.id);
      setPosts(newPosts);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const editedTitle = formData.get('title');
    const editedViews = formData.get('views');
    
    const payload = {title: editedTitle, views: Number(editedViews)};

    try {
        const data = await putPost(id, payload);
        const updatedPosts = posts.map((post) => post.id === id ? data : post);
        setPosts(updatedPosts);
        setEdit(false);
    }
    catch(error) {
        console.log('error', error);
        throw error;
    }
  };

  useEffect(() => {
    if(edit) {
        console.log(editedTitleRef.current);
        
        editedTitleRef.current.focus();
    }
  }, [edit])

  const handleClickEdit = () => {
    setEdit(true);
    // console.log(editedTitleRef);
    // editedTitleRef?.current.focus();
  }

  return (
    <div>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            defaultValue={title}
            ref={editedTitleRef}
          />
          <input
            type="number"
            name="views"
            defaultValue={views}
          />
          <button type="submit">Apply</button>
        </form>
      ) : (
        <>
          <h2>{title}</h2>
          <p>Views: {views}</p>
           <Button variant="contained" onClick={handleClickEdit} color="warning" classes={{root: 'btn-primary'}} startIcon={<ModeEditOutlineOutlinedIcon />}>Edit</Button>
           <Button variant="contained" onClick={() => handleDelete(id)} size="small">Delete</Button>
          {/* <button onClick={handleClickEdit}>Edit</button>
          <button onClick={() => handleDelete(id)} >Delete</button> */}
        </>
      )}
    </div>
  );
};
