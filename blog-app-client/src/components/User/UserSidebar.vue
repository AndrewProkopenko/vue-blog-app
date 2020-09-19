<template>
    <div>
         <div class="d-flex flex-row mb-4 border border-black rounded bg-white"> 
               
            <router-link :to="`/${user.username}`" class=" menu-sidebar-item ">
                   My Profille
            </router-link> 
            <router-link to="/settings/profile" class=" menu-sidebar-item">
                    <font-awesome-icon icon="cogs" />
            </router-link>
            <a href="/" class="menu-sidebar-item">
                    <font-awesome-icon icon="sign-out-alt" />
            </a>
            
        </div>

        <div class="px-3 py-2 bg-white rounded">
            <h5 class="mb-1 text-black-50">Quick post</h5>
            <form @submit.prevent="addPost" class="needs-validation" novalidate=''>
                <div class="mb-2"> 
                    <input 
                        name="title"
                        type="text" 
                        class="form-control" 
                        id="posttitle" 
                        placeholder="Title"
                        v-model="post.title"
                        required
                    > 
                    <div class="valid-feedback">
                        This fields required
                    </div>
                </div>
                <div class="mb-0"> 
                    <textarea 
                        name="content" 
                        class="form-control" 
                        id="postcontent" 
                        placeholder="Content"
                        v-model="post.content"
                        required
                    ></textarea>
                    <div class="valid-feedback">
                        This fields required
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    class="btn btn-custom w-100 py-2 mt-2"
                    :disabled="!isValid"
                >
                    <span> Post </span>
                </button>
            </form>
        </div>

       
        
    </div>
</template>

<script>
 

import EventBus from '@/eventBus'

export default {
    name: 'UserSidebar',
    props: { 
        user: { 
            type: Object, 
            required: true
        },  
    }, 
    data() { 
        return { 
            post: {
                title: '',
                content: ''
            }
        }
    }, 

    computed: { 
        isValid() { 
            return this.post.content.length && this.post.title.length
        }
    }, 

    methods: { 
        addPost() { 
            const token = localStorage.getItem('blog-app-token') 

            window.axios.post('/post', {
                title: this.post.title, 
                content: this.post.content, 
            }, {
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             })
                .then( response => {
                    EventBus.$emit('postAdded', response.data.data)
                    this.post.title = ""
                    this.post.content = ""
                 })
        }
    }
}
</script>

<style>
   
</style>