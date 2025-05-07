import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import Directory from '../views/Directory.vue'
import ProfileDetail from '../views/ProfileDetail.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import { supabase } from '../lib/supabase'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile, meta: { requiresAuth: true }},
  { path: '/profile/:id', component: Profile, meta: { requiresAuth: true }},
  { path: '/edit/:id', component: Profile, meta: { requiresAuth: true }},
  { path: '/admin', component: Admin, meta: { requiresAuth: true }, requiresAdmin: true},
  { path: '/directory', component: Directory, meta: { requiresAuth: true }},
  { path: '/profiles/:id', component: ProfileDetail },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser()

  if ((to.path === '/login' || to.path === '/signup') && user) {
    return next('/directory')
  }

  if (to.meta.requiresAdmin) {
    if (!user) return next('/login')

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) return next('/directory')
  }

  return next()
})

export default router
