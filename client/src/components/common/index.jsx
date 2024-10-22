import { AiFillDashboard } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";


export const SuperAdminMenuList = [
    { name: 'Dashboard', icon: <IoMdHome />, value: 'Dashboard', to: '/admin' },
    {
        name: 'Course Master', icon: <FaPlus />, value: 'Data', to: '', children: [
            { id: 1, name: 'Mode', value: 'Mode', to: '/create-mode' },
            { id: 2, name: 'Group', value: 'Group', to: '/add-group' },
            { id: 3, name: 'Category', value: 'Category', to: '/add-category' },
            { id: 4, name: 'Session', value: 'Session', to: '/add-session' },
            { id: 5, name: 'Course', value: 'Course', to: '/add-course' },
            // { id: 4, name: 'College', value: 'College', to: '/add-college' },
            // { id: 5, name: 'Session', value: 'Session', to: '/add-session' },
            // { id: 6, name: 'Session', value: 'Session', to: '/add-session' },
            // { id: 4, name: 'Add Expense', value: 'Add Expense', src: rank, to: '/create-page/rank' },
        ]
    },
    { name: 'Manage Course', icon: <FiEdit />, value: 'manage', to: '',children:[
        {id:1,name:'View Course',value:"View Course", to:'/course-details'}
    ] },
    { name: 'User', icon: <FaPlus />, value: 'User', to: '/usr-page' },
   
]
