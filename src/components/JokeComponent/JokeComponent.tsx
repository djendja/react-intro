import { useEffect, useState } from "react";
import { getJokes } from "../../api/Api";
import type { JokeProps } from "../../api/Api.models";

export const JokeComponent = () => {
  const [joke, setJoke] = useState<JokeProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadJokes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJokes();        
        setJoke(data);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
        setError("error");
        throw error;
      } finally {
        setLoading(false);
      }
    };

    loadJokes();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getJokes();
      setJoke(data);      
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setError("error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        <p>{joke?.setup}</p>
        <p>{joke?.punchline}</p>
      <button onClick={handleClick}>Get new joke</button>
    </div>
  );
};
