import { AiFillDashboard } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";


export const SuperAdminMenuList = [
    { name: 'Dashboard', icon: <IoMdHome />, value: 'Dashboard', to: '/dashboard' },
    {
        name: 'Course Master', icon: <FaPlus />, value: 'Data', to: '', children: [
            { id: 1, name: 'Category', value: 'Category', to: '/add-category' },
            { id: 2, name: 'Mode', value: 'Mode', to: '/create-mode' },
            { id: 3, name: 'Session', value: 'Session', to: '/add-session' },
            { id: 4, name: 'College', value: 'College', to: '/add-college' },
            { id: 5, name: 'Session', value: 'Session', to: '/add-session' },
            { id: 6, name: 'Session', value: 'Session', to: '/add-session' },
            // { id: 4, name: 'Add Expense', value: 'Add Expense', src: rank, to: '/create-page/rank' },
        ]
    },
    { name: 'User', icon: <FaPlus />, value: 'User', to: '/usr-page' },
   
]