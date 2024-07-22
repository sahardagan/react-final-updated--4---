
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../services/authService'; // Adjust this according to your auth service

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.getCurrentUser()) return <Redirect to="/login" />;
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
