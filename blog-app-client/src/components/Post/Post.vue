<template>
    <router-link class="text-decoration-none" :to="`/${post.user.username}/post/${post.id}`">
        <div class="card bg-light mb-3"  >
            <div class="row g-0">
                <div class="col-md-2">
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <router-link  :to="`/${post.user.username}`">
                            <img class="rounded-circle post-image" src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"  alt="...">
                        </router-link>
                    </div>
                </div>
                <div class="col-md-10">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <router-link class="link-primary text-decoration-none" :to="`/${post.user.username}`">
                            {{post.user.name}}
                            <small>
                                @{{post.user.username}}
                            </small>
                        </router-link>
                        
                        <div class="dropdown">
                            <button class="btn  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
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
                        :replies="post.replies"
                        :auth-user="authUser"
                        :favorites.sync="post.favorites"
                    />

                   
                </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>

import Reactions from './Reactions'

export default {
    name: 'Post',
    components: {  
        Reactions
    }, 
    props: { 
        post: { 
            type: Object, 
            required: true
        }, 
        authUser: { 
            type: Object, 
            required: true
        }
    }, 
    computed: {
        isItMine() { 
            return this.post.user_id === this.authUser.id
        }
    }, 
    methods: { 
        deletePost(postId) { 
             const token = localStorage.getItem('blog-app-token') 
                
             if(confirm("delete?")) {
                window.axios.delete(`/post/delete/${postId}`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then( () => {  
                        this.$emit('delete', postId) 
                    })
             }
        }
    }
}
</script>

<style>
    .post-image { 
        width: 50px;
        height: 50px;
    }
</style>