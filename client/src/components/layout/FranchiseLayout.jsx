import React, { useEffect } from 'react';
import FranchiseHeader from '../header/FranchiseHeader.jsx';
import FranchMenu from '../header/FranchMenu.jsx';
import Context from '../context/Index.jsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { usrDetails } from '../store/CreateSlicer.js';

const FranchiseLayout = (props) => {
    const dispatch = useDispatch();

    const midFun = async () => {
        try {
            const response = await axios.get('/api/v1/access-token');
            if (response.data.result) {
                dispatch(usrDetails(response.data.result));
            }
            // console.log(response.data.result);
        } catch (error) {
            console.error('Error fetching access token:', error.message);
        }
    };

    useEffect(() => {
        midFun();
    }, []);

    return (
        <Context.Provider value={{ midFun }}>
            <FranchiseHeader className='h-14' />
            <div className='flex gap-2'>
                <div className='max-w-[15rem]'>
                    <FranchMenu className="z-10" />
                </div>
                <main className='flex justify-center py-3 px-3 w-full overflow-y-auto' style={{ height: '91vh' }}>
                    {props.children}
                </main>
            </div>
        </Context.Provider>
    );
}

export default FranchiseLayout;
