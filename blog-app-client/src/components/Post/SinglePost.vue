<template>
    <div class="container col-md-8 col-lg-6 mt-3 mb-5">
         
        <button class="btn btn-custom px-4 mb-3" @click='back'>
            Back
        </button>

        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-2">
                    <div class="d-flex justify-content-center align-items-center h-100">
                        
                        <img class="rounded-circle post-image" src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"  alt="...">
                        
                    </div>
                </div>
                <div class="col-md-10">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <router-link class="link-primary text-decoration-none" :to="`/${user.username}`">
                            {{user.name}}
                            <small>
                                @{{user.username}}
                            </small>
                        </router-link>
                        <div class="dropdown">
                            <button class="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                <div class="toolbar-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li v-if="isItMine"><a class="dropdown-item" @click.prevent="deletePost(post.id)">Delete</a></li> 
                            </ul>
                        </div>
                    </div>
                    
                    <h5 class="card-title text-dark">
                        {{ post.title }}
                    </h5> 
                    <p class="card-text text-dark">
                        {{ post.content }}
                    </p>
                    <p class="card-text">
                        <small class="text-muted">
                                {{ post.created_at | timeAgo }}
                        </small>
                    </p>
                    <Reactions
                        :post="post"
                        :replies="replies"
                        :auth-user="authUser"
                        :favorites.sync="favorites"
                    />

                </div>
                </div>
            </div>
        </div>

        <div class="card p-3">
              <form @submit.prevent="replyPost" class="needs-validation mb-3" novalidate=''>
                    <div class="mb-0">
                      
                        <textarea 
                            name="reply" 
                            class="form-control"  
                            v-model="reply" 
                            rows="1"
                            required
                        >  
                        </textarea>
                    </div>
                    
                    
                    <button 
                        type="submit" 
                        class="btn btn-custom w-100 py-2 mt-2"
                        :disabled="!isValid"
                    >
                       Reply
                    </button>
                </form>
                 
                <small class=" text-muted mt-3 mb-1" v-show="!replies.length">
                    No Replies yet. Be first ... 
                </small>
            <Replies
                :replies="replies"
            />
        </div>
    </div>
</template>

<script>

import Replies from './Replies'
import Reactions from './Reactions'

export default {
    name: "SinglePost", 
    components: { 
        Replies, 
        Reactions
    }, 
    data() { 
        return { 
            post: {}, 
            user: {}, 
            replies: [], 
            reply: '', 
            authUser: {}, 
            favorites: []
        }
    },   
    computed: {
        isValid() {
            return !!this.reply
        }, 
        isItMine() { 
            return this.post.user_id === this.authUser.id
        }
    },
    created() { 
        this.fetchPost()
        this.fetchAuthUser()

    }, 
    methods: { 
        fetchPost() { 
             window.axios.get(`/post/${this.$route.params.id}`)
                .then( response => { 
                    this.post = response.data.data
                    this.user = response.data.data.user
                    this.replies = response.data.data.replies.reverse()
                    this.favorites = response.data.data.favorites
                })

        }, 

        back() { 
            this.$router.go(-1)
        }, 

        replyPost() {   
            const token = localStorage.getItem('blog-app-token') 

            window.axios.post(`/post/reply/${this.post.id}`, {
                reply: this.reply
            }, { 
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
            })  
                .then( response => { 
                    this.reply = ''
                    this.replies.unshift(response.data.data)
                })
                .catch( error => { 
                    console.log(error.response)
                })
        }, 
        fetchAuthUser() { 
            const token = localStorage.getItem('blog-app-token')

            window.axios.get(`profile/me`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then( response => {  
                    this.authUser = response.data.data 
                })

        }, 

        deletePost(postId) { 
             const token = localStorage.getItem('blog-app-token') 
                
             if(confirm("delete?")) {
                window.axios.delete(`/post/delete/${postId}`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then( () => {  
                        this.$router.go(-1)
                    })
             }
        }
    }, 

    
}
</script>

<style>

</style>