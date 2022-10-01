<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', id: this.id }"
        v-slot="{ navigate }"
      >
        <button @click="navigate" @keypress.enter="navigate" class="btn-green btn-small">
          Edit Tread
        </button>
      </router-link>
    </h1>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { findById } from '@/helpers'

export default {
  name: 'ThreadShow',
  components: {
    PostList,
    PostEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    threads () {
      return this.$store.state.threads
    },
    posts () {
      return this.$store.state.posts
    },
    thread () {
      return findById(this.threads, this.id)
    },
    threadPosts () {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },
  methods: {
    addPost (eventData) {
      //console.log(eventData);
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>