import About from "../pages/About";
import ClassScreen from "../pages/ClassScreen";
import Dashboard from "../pages/Dashboard";
import GetStarted from "../pages/GetStarted";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import StudentSignup from "../pages/StudentSignup";
import Signup from "../pages/StudentSignup";
import TeacherSignup from "../pages/TeacherSignup";

const routes = [
    { path: '/', name: 'Home Page', component: Home, exact: true },
    { path: '/get started', name: 'Get Started Page', component: GetStarted, exact: true },
    { path: '/about', name: 'About Page', component: About, exact: true },
    { path: '/student/signup', name: 'Signup Page', component: StudentSignup, exact: true },
    { path: '/teacher/signup', name: 'Teacher Signup Page', component: TeacherSignup, exact: true },
    // { path: '/signup', name: 'Signup Page', component: Signup, exact: true },
    // { path: '/signin', name: 'Signin Page', component: Signin, exact: true },
    { path: '/application/dashboard', name: 'dashboard Page', component: Dashboard, exact: true },
    { path: '/application/dashboard/class/:classId', name: 'Class Screen Page', component: Dashboard, exact: true },
]

export default routes;