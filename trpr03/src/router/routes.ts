import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import TesterManager from '@/views/TesterManager.vue'
import DevBugList from '@/views/DevBugList.vue'
import TesterBugList from '@/views/TesterBugList.vue'
import AddBugCategory from '@/views/AddBugCategory.vue'

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
    component: TesterManager,
    meta: {
      requiresAuth: true,
      requiresDev: true
    }
  },
  {
    path: '/devBugList',
    name: 'DevBugList',
    component: DevBugList,
    meta: {
      requiresAuth: true,
      requiresDev: true
    }
  },
  {
    path: '/testerBugList',
    name: 'TesterBugList',
    component: TesterBugList,
    meta: {
      requiresAuth: true,
      requiresNonDev: true
    }
  },
  {
    path: '/addBugCategory',
    name: 'AddBugCategory',
    component: AddBugCategory,
    meta: {
      requiresAuth: true,
      requiresDev: true
    }
  }
]

export default routes
