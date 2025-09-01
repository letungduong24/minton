import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Loading from '../Common/Loading';
import Navbar from '../Admin/Navbar';
import Topbar from '../Admin/Topbar'
import { Children } from 'react';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (user.role !== 'Admin') {
        return <Navigate to="/503" replace />; 
    }

    return (
        <div className='flex h-screen bg-gray-100 p-3 gap-3 w-full'>
            <Navbar/>
            <div className="flex flex-col w-full gap-3">
                <Topbar />
                {children}
            </div>
        </div>
    )
};

export default AdminRoute;
