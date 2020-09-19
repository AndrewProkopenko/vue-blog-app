<template>
    <div class="container mt-3">
        <div class="row">
          <div class="col-12 col-md-4">
            <UserSidebar
              :user="user"
            />
          </div>
          <div class="col-12 mt-3 mt-md-0 col-md-6">
            <div class="p-3 bg-white rounded">
                <h3>Feed</h3>
                <h6 v-if="!this.posts.length" class="text-muted mt-3">No posts yet...</h6>
                <Posts
                  :posts.sync="posts"
                  :auth-user='user'
                />
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Posts from '@/components/Post/Posts'
export default {    
    name: 'Home', 
    components: { 
        UserSidebar,
        Posts
    }, 
    data()  {
      return  {
        user: {},  
        posts: []
      }
    },
    beforeRouteEnter ( to, from, next) { 
        const token = localStorage.getItem('blog-app-token') 
        return token ? next() : next ('/signin')
    },
    
    created()  {
      this.fetchUserData()
      this.fetchTimeline()
    }, 

    methods: { 
        fetchUserData() {
            const token = localStorage.getItem('blog-app-token')
            window.axios.get('profile/me', { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })  
              .then( response => {
                this.user = response.data.data
              }) 
        }, 
        fetchTimeline() {
            const token = localStorage.getItem('blog-app-token')
            window.axios.get('users/timeline', { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })  
              .then( response => {
                this.posts = response.data.data.reverse()
              }) 
        }
    }

}
</script>

<style>

</style>