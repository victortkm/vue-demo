import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import UserListView from '../views/UserListView/index.vue'
import UserView from '../views/UserView'
import GroupListView from '../views/GroupListView'
import GroupView from '../views/GroupView'
// import SettingView from '../views/SettingView'
import PendingApprovalListView from '../views/PendingApprovalListView'
import PendingApprovalView from '../views/PendingApprovalView'
import FunctionListView from '../views/FunctionListView'
import FunctionView from '../views/FunctionView'
import FunctionCategoryListView from '../views/FunctionCategoryListView'
import FunctionCategoryView from '../views/FunctionCategoryView'

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
    path: '/functionListing',
    name: 'functionListing',
    component: FunctionListView
  },
  {
    path: '/functionDetails',
    name: 'functionDetails',
    component: FunctionView
  },
  {
    path: '/functionCategoryListing',
    name: 'functionCategoryListing',
    component: FunctionCategoryListView
  },
  {
    path: '/functionCategoryDetails',
    name: 'functionCategoryDetails',
    component: FunctionCategoryView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const NavRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    title: 'Home',
    icon: 'mdi-home-outline',
  },
  {
    path: '/pendApprListing',
    name: 'pendApprListing',
    component: PendingApprovalListView,
    title: 'Pending Approval List',
    icon: 'mdi-list-box-outline',
  },
  // {
  //   path: '/pendApprDetails',
  //   name: 'pendApprDetails',
  //   component: PendingApprovalView,
  //   title: 'Pending Approval',
  //   icon: 'mdi-view-dashboard',
  // },
  {
    path: '/userListing',
    name: 'userListing',
    component: UserListView,
    title: 'User Listing',
    icon: 'mdi-account-outline',
  },
  // {
  //   path: '/userDetails',
  //   name: 'userDetails',
  //   component: UserView,
  //   title: 'User Details',
  //   icon: 'mdi-view-dashboard',
  // },
  {
    path: '/groupListing',
    name: 'groupListing',
    component: GroupListView,
    title: 'Group Listing',
    icon: 'mdi-account-group-outline',
  },
  // {
  //   path: '/groupDetails',
  //   name: 'groupDetails',
  //   component: GroupView,
  //   title: 'Group Details',
  //   icon: 'mdi-vuetify',
  // },
  {
    path: '/functionListing',
    name: 'functionListing',
    component: FunctionListView,
    title: 'Function Listing',
    icon: 'mdi-function',
  },
  // {
  //   path: '/functionDetails',
  //   name: 'functionDetails',
  //   component: FunctionView,
  //   title: 'Function Details',
  //   icon: 'mdi-vuetify',
  // },
  {
    path: '/functionCategoryListing',
    name: 'functionCategoryListing',
    component: FunctionCategoryListView,
    title: 'Function Category Listing',
    icon: 'mdi-text-account',
  },
  // {
  //   path: '/functionCategoryDetails',
  //   name: 'functionCategoryDetails',
  //   component: FunctionCategoryView,
  //   title: 'Function Category Details',
  //   icon: 'mdi-vuetify',
  // },
]

export default router
