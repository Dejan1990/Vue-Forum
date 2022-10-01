import HomePage from '@/pages/HomePage'
import ThreadShow from '@/pages/ThreadShow'
import NotFound from '@/pages/NotFound'
import ForumPage from '@/pages/ForumPage'
import CategoryPage from '@/pages/CategoryPage'
import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: CategoryPage,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: ForumPage,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter (to, from, next) { // can v-if, v-else in template instead of this
      // check if thread exists
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
      // if exists continue
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash
        })
      }
      // if doesnt exist redirect to not found
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

