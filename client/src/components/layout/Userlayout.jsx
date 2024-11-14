import React from 'react'
import Footer from '../header/Footer'
import UserHeader from '../header/UserHeader'

const Userlayout = (props) => {
    return (
        <div className=''>
            <UserHeader />
            <main className='flex justify-center flex-col py-1 px-1 w-full overflow-y-auto'>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Userlayout