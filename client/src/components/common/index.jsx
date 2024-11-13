import { AiFillDashboard } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaStoreAlt } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";

export const SuperAdminMenuList = [
    { name: 'Dashboard', icon: <IoMdHome className="text-red-600 text-xl mr-2"/>, value: 'Dashboard', to: '/dashboard' },
    {
        name: 'Course Master', icon: <FaPlus className="text-orange-600 text-xl mr-2" />, value: 'Data', to: '', children: [
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
    { name: 'Manage Course', icon: <FiEdit className="text-purple-600 text-xl mr-2"/>, value: 'manage', to: '',children:[
        {id:1,name:'View Course',value:"View Course", to:'/course-details'}
    ] },
    { name: 'Franchise', icon: <FaStoreAlt className="text-green-600 text-xl mr-2" />, value: 'Franchise', to: '',children:[
        {id:1,name:'New ' ,value:'New',to:'/received-applicant'},
        {id:2,name:'List',value:'List',to:'/franchise'}
    ] },
    { name: 'Offer Zone', icon: <BiSolidOffer className="text-blue-600 text-xl mr-2" />, value: 'offer', to: '/offer' },
    { name: 'Create Announcement', icon: <FaStoreAlt className="text-yellow-600 text-xl mr-2"/>, value: 'Create Announcement', to: '/announcement'  },
    { name: 'Commission', icon: <MdAttachMoney className="text-green-600 text-xl mr-2" />, value: 'Commission', to: '',children:[
        {id:1,name:"Create commission",value:"Create commission",to:'/create-commission'},
        {id:1,name:" View commission ",value:" View commission ",to:'/'},
    ]  },
]

export const FranchiseMenuList=[
    {name: 'Dashboard', icon:<IoMdHome/>,value:'Dashboard',to:'/dashboard'},
    {name: 'Admission', icon:<PiStudentDuotone />,value:'Admission',to:'/admission-form'},
    {name: 'Commision', icon:<MdAttachMoney />,value:'Commision',to:'',children:[
       { id:1 ,name:'Student Wise' ,value:"Student Wise",to:'/student-commision'},
       { id:1 ,name:'course Wise' ,value:"Course Wise",to:'/course-commision'},
    ]},


]

export const StudentMenuList=[
    {name: 'Dashboard', icon:<IoMdHome/>,value:'Dashboard',to:'/dashboard'},
    {name: 'Enrolled courses', icon:<PiStudentDuotone />,value:'Enrolled courses',to:'',children:[
        { id: 1, name: 'Skill Courses', value: 'Skill Courses', to: '/enrolled-courses' },
        { id: 2, name: 'Degree Program', value: 'Degree Program', to: '/degreecourses' },
    ]},
    {name: 'Certificate', icon:<PiStudentDuotone />,value:'Certificate',to:'/certificate'},
    { name: 'Fees Statement', icon: <FaStoreAlt />, value: 'Fees Statement', to: '/fees-details'  },
    { name: 'Identity Card', icon: <FaStoreAlt />, value: 'Identity Card', to: '/student-id'  },

]