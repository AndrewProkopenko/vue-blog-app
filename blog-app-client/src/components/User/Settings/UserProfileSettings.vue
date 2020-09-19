<template>
  <div class="container mt-3 mb-5">
        <div class="row">
            <div class="col-12 col-sm-3">
                  <UserSettingsMenu/> 
            </div>
            <div class="col-sm-1"></div>
            <div class="col-12 col-sm-8 col-lg-4">
                <h2 class="text-center">
                    Edit Profile 
                </h2>
                <Notification
                    :message = "notification.message"
                    :type = "notification.type"
                    v-if="notification"
                />
                
                <form @submit.prevent="updateProfile" class="needs-validation" novalidate=''>
                    <div class="mb-2">
                        <label for="nameFormSignUp" class="form-label">Name</label>
                        <input 
                            name="name"
                            type="text" 
                            class="form-control" 
                            id="nameFormSignUp"
                            v-model="name"  
                            required
                        > 
                    </div>
                    <div class="mb-2">
                        <label for="usernameFormSignUp" class="form-label">Username</label>
                        <input 
                            name='username' 
                            type="text" 
                            class="form-control" 
                            id="usernameFormSignUp" 
                            v-model="username"  
                            required
                        > 
                    </div>
                    
                    <div class="mb-2">
                        <label for="emailFormSignUp" class="form-label">Email address</label>
                        <input 
                            name="email"
                            type="email" 
                            class="form-control" 
                            id="emailFormSignUp" 
                            v-model="email"
                            required
                        > 
                        <div class="valid-feedback">
                            This fields required
                        </div>
                    </div>

                    <div class="mb-2">
                        <label for="location" class="form-label">Location</label>
                        <input 
                            name="location"
                            type="text" 
                            class="form-control" 
                            id="location" 
                            v-model="location" 
                        >  
                    </div>
                    
                    <div class="mb-2">
                        <label for="website_url" class="form-label">Website URL</label>
                        <input 
                            name="website_url"
                            type="url" 
                            class="form-control" 
                            id="website_url" 
                            v-model="website_url" 
                        >  
                    </div>
                    
                    <div class="mb-2">
                        <label for="bio" class="form-label">About You</label>
                        <textarea 
                            name="bio" 
                            class="form-control" 
                            id="bio" 
                            v-model="bio" 
                            rows="4"
                        >  
                        </textarea>
                    </div>
                    
                    
                    <button 
                        type="submit" 
                        class="btn btn-custom w-100 py-2 mt-3"
                        :disabled="!isValid"
                    >
                       Save
                    </button>
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import UserSettingsMenu from './UserSettingsMenu'
import Notification from '@/components/Notification'
export default {
    name: "UserProfileSettings", 
    components: { 
        UserSettingsMenu,
        Notification
    },
    data() { 
        return {
            name: '',
            username: '',
            email: '',
            location: '',
            website_url: '',
            bio: '',
            notification: {
                message : '', 
                type: ''
            }
        }
    },
    computed: {
        isValid() {
            return this.name && this.username && this.email 
        }
    }, 
    
    beforeRouteEnter ( to, from, next) { 
        const token = localStorage.getItem('blog-app-token') 
        return token ? next() : next ('/signin')
    },

    created() {
        this.fetchUser()
    },

    methods: { 
        fetchUser() { 
             const token = localStorage.getItem('blog-app-token')
             window.axios.get('/profile/me', {
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             })
                .then( response => {
                    this.name = response.data.data.name
                    this.username = response.data.data.username
                    this.email = response.data.data.email
                    this.location = response.data.data.location
                    this.website_url = response.data.data.website_url
                    this.bio = response.data.data.bio
                })
                .catch( error => {
                    console.log(error)
                })
        }, 

        updateProfile() { 
            const token = localStorage.getItem('blog-app-token') 
            
             window.axios.put('/profile/update', {
                 name : this.name, 
                 username : this.username, 
                 email : this.email, 
                 location : this.location, 
                 website_url : this.website_url, 
                 bio : this.bio
             } ,{
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             })
                .then( response => {
                    this.notification = { 
                        message: response.data.message, 
                        type: response.data.status, 

                    }
                })
                .catch( error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>
    textarea { 
        resize: none !important;
    }
</style>