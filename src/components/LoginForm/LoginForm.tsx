import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginUser } from "../../api/Api";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router";
import type { UserProps } from "../../api/Api.models";
import { useAuth } from "../../providers/AuthContext";


const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'at least 6 characters')
}).required();

export const LoginForm = () => {
    const { user, login, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user, navigate])


    const onSubmit = async (data: {email: string, password: string}) => {
        await login(data.email, data.password)
    }


    return <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')}/>
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register('password')}/>
        {errors.password && <p>{errors.password.message}</p>}
        {error && <p>{error}</p>}
        <button type="submit">{isLoading ? 'Logging in...' : 'Login'}</button>
    </form>
}