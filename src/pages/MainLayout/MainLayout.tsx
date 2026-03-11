import { Navigate, Outlet } from "react-router"
import { Header } from "../../components/Header/Header"
import { useAuth } from "../../providers/AuthContext"

export const MainLayout = () => {
    const {user, isLoading} = useAuth();

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!user) return <Navigate to="/login" replace/>

    return <div>
        <Header />
        <Outlet />
    </div>
}