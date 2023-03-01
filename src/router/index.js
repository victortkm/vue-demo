import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import UserListView from '../views/UserListView/index.vue'
import UserView from '../views/UserView'
import GroupListView from '../views/GroupListView'
import GroupView from '../views/GroupView'
import SettingView from '../views/SettingView'
import PendingApprovalListView from '../views/PendingApprovalListView'
import PendingApprovalView from '../views/PendingApprovalView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView/index.vue')
    component: AboutView
  },
  {
    path: '/pendApprListing',
    name: 'pendApprListing',
    component: PendingApprovalListView
  },
  {
    path: '/pendApprDetails',
    name: 'pendApprDetails',
    component: PendingApprovalView
  },
  {
    path: '/userListing',
    name: 'userListing',
    component: UserListView
  },
  {
    path: '/userDetails',
    name: 'userDetails',
    component: UserView
  },
  {
    path: '/groupListing',
    name: 'groupListing',
    component: GroupListView
  },
  {
    path: '/groupDetails',
    name: 'groupDetails',
    component: GroupView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
