import * as React from 'react';
import { useAppSelector } from '../app/hooks';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoute: React.FC = () => {
     const navigate = useNavigate();
     const { userInfo } = useAppSelector((state) => state.userSignin);

     React.useEffect(() => {
          if (!userInfo) {
               navigate('/signin')
          }
     }, []);

     return (
          <>
               <Outlet />
          </>
     )
}