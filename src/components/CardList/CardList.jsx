import { useEffect, useState } from "react";
import { Card } from "./Card/Card";
import { getPosts, postPosts } from "../../api/Api";
import { useAppContext } from "../../hooks/useAppContext";

function CardList() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [views, setViews] = useState(0);
    const { setLang } = useAppContext();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            }
            catch (error) {
                console.log('error', error);
                throw error;
            }
        }
        loadPosts();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {title: title, views: Number(views)};
        try {
            const data = await postPosts(payload);
            setPosts([...posts, data]);
            setTitle('');
            setViews(0); 
        }
        catch(error) {
            console.log('error', error);
            throw Error;
        }
        setLang('fr');
    }

    return <div>
        {posts?.map((post) => {
            return <Card key={post?.id} title={post?.title} views={post?.views} id={post?.id} setPosts={setPosts} posts={posts}/>
        })}
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input type="number" name="views"  value={views} onChange={(e) => setViews(e.currentTarget.value)}/>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default CardList;