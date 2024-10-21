import React from 'react'
import Footer from '../header/Footer'
import UserHeader from '../header/UserHeader'

const Userlayout = () => {
    return (
        <div className='flex gap-2'>
            <UserHeader />
            {/* <div className='max-w-[15rem]'>
                <Menu className="z-10" />
            </div> */}
            <main className='flex justify-center py-3 px-3 w-full overflow-y-auto' style={{ height: '91vh' }}>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Userlayout