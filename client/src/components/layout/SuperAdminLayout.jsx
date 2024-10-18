import React, { useEffect } from 'react';
import Header from '../header/Header';
import Menu from '../header/Menu';
import authContext from '../context/Index.jsx';
import axios from 'axios';

const SuperAdminLayout = (props) => {
         
    const midFun = async () => { 
        try { 
            const response = await axios.get('/api/v1/access-token');   
            console.log(response);     
        } catch (error) { 
            console.error('Error fetching access token:', error);       
        }            
    };    
    useEffect(() => { 
        midFun();
    }, []);  

    return (      
        <> 
            <authContext.Provider value={{midFun}}>
                <Header className='h-14' />
                <div className='flex gap-2'>
                    <div className='max-w-[15rem]'>
                        <Menu className="z-10" />
                    </div>
                    <main className='flex justify-center py-3 px-3 w-full' style={{ height: '91vh' }}>
                        {props.children}
                    </main>
                </div>   
                {/* <Footer /> */}
            </authContext.Provider>
        </>
    );
}

export default SuperAdminLayout;
