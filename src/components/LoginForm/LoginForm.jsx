import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginUser } from "../../api/Api";
import { useAppContext } from "../../hooks/useAppContext";


const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'at least 6 characters')
}).required();

export const LoginForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {setUser} = useAppContext();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema)
    });


    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        setError('');

        try {
            const users = await loginUser();
            const user = users.find((user) => user.email === data.email && user.password === data.password);
            if(user) {
                setUser(user);
                setLoading(false);
            }
            else {
                setError('invalid email or password')
            }
        }
        catch(error) {
            console.log("error", error);
            setError('Error')
        }
        finally {
            setLoading(false);
        }
        
    }


    return <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')}/>
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register('password')}/>
        {errors.password && <p>{errors.password.message}</p>}
        {error && <p>{error}</p>}
        <button type="submit">{loading ? 'Logging in...' : 'Login'}</button>
    </form>
}