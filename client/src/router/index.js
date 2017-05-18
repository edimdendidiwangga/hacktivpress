import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Posts'
import DetailPost from '@/components/DetailPost'
import PostByAuthor from '@/components/PostByAuthor'
import PostByCategory from '@/components/PostByCategory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
		{
      path: '/posts',
      name: 'Post',
      component: Post
    },
		{
      path: '/category/:category',
      name: 'PostByCategory',
      component: PostByCategory,
			props: true
    },
		{
      path: '/author/:author',
      name: 'PostByAuthor',
      component: PostByAuthor,
			props: true
    },
		{
      path: '/detail-post/:id',
      name: 'DetailPost',
      component: DetailPost,
			props: true
    }
  ]
})
