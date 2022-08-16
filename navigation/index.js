import React from 'react'
import { AuthProvider } from './AuthProvider';


import Routes from './Routes';


function Navigation() {

    

    return (
        <AuthProvider>
        
            <Routes />
       
        </AuthProvider>
        
    )
}

export default Navigation