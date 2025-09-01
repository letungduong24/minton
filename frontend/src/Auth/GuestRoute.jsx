import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Loading from '../Common/Loading'
import { useEffect } from 'react';

const GuestRoute = ({ children }) => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return (
            <Loading />
        );
    }
    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;  
