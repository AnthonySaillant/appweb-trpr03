import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import TesterManager from '@/views/TesterManager.vue'
import DevBugList from '@/views/DevBugList.vue'
import TesterBugList from '@/views/TesterBugList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/testerManager',
    name: 'TesterManager',
    component: TesterManager
  },
  {
    path: '/devBugList',
    name: 'DevBugList',
    component: DevBugList
  },
  {
    path: '/testerBugList',
    name: 'TesterBugList',
    component: TesterBugList
  }
]

export default routes
