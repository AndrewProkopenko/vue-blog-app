<template>
    <div class="d-flex flex-column">
        <Post
            v-for="post in posts"
            :key="post.id"
            :post='post'
            :auth-user = 'authUser'
            v-on:delete="removeDeletedPost"
        />
    </div>
</template>

<script>
import EventBus from '@/eventBus'
import Post from './Post'
export default {
    name: 'Posts', 
    components: { 
        Post
    },
    props: { 
        posts: { 
            type: Array, 
            required: true
        }, 
        authUser: { 
            type: Object, 
            required: true
        }
    }, 
    created() { 
        EventBus.$on('postAdded', this.fetchAddedPost)
    },
    methods: { 
        fetchAddedPost(post) { 
            this.posts.unshift(post)
        },
        removeDeletedPost(postId) { 
            const filtered = this.posts.filter( post => {
                return post.id !== postId
            })
            this.$emit('update:posts', filtered)
        }
    }
}
</script>

<style>

</style>