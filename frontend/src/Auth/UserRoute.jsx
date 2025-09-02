import { Navigate } from 'react-router-dom';
import useAuthStore from '../Store/authStore';
import Loading from '../Components/Common/Loading'

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return (
        <div className="">
            {children}
        </div>
    )
};

export default AdminRoute;
