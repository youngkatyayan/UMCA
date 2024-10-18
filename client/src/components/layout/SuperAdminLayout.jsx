import React from 'react'
import Header from '../header/Header'
import Menu from '../header/Menu'
import Context from '../../content/index.js';

const SuperAdminLayout = (prop) => {
   
    // const dispatch = useDispatch()
    // const midFun = async () => {
    //     try {
    //         const response = await axios.get('/api/v1/access-token');
    //         dispatch(userDetails(response.data.result[0]))
    //     } catch (error) {
    //         console.error('Error fetching access token:', error);
    //     }
    // };
    // useEffect(() => {
    //     midFun();
    // }, []);
    
    // get all expense
    // const fetchExpense = async () => {
    //     try {
    //       const response = await axios.get('/api/v1/get-expense');
    //       if (response.data.success) {
    //         dispatch(ExpenseDetails(response.data.result));
    //       }
    //     } catch (error) {
    //       console.error('Error fetching  in get expense:', error);
    //     }
    //   }
    //   useEffect(() => {
    //     fetchExpense();
    //   }, []);
  return (
    <>
            <Context.Provider >
                <Header className='h-14' />
                <div className='flex'>
                    <div>
                        
                        <Menu className="z-10"/>
                    </div>
                    <main className='md:w-[calc(100%-42vh)]  w-[calc(100%-3rem)] ' style={{ Height: '91vh' }}>
                        {prop.children}
                    </main>
                </div>
                {/* <Footer /> */}
            </Context.Provider>
        </>
  )
}

export default SuperAdminLayout