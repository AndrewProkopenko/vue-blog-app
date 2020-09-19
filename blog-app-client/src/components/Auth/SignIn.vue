<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-lg-6">
                <div class="content-item mt-4">
                    <h3 class=" text-center font-weight-bold">Sign In</h3>

                <Notification
                    :message = "notification.message"
                    :type = "notification.type"
                    v-if="notification"
                />

                <form @submit.prevent="signin" class="needs-validation" novalidate=''>
                    
                    
                    
                    <div class="mb-2">
                        <label for="emailFormSignIn" class="form-label">Your Email</label>
                        <input 
                            name="email"
                            type="email" 
                            class="form-control" 
                            id="emailFormSignIn" 
                            v-model="email"
                            required
                        > 
                        <div class="valid-feedback">
                            This fields required
                        </div>
                    </div>
                    <div class="mb-2">
                        <label for="passwordFormSignIn" class="form-label">Your Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            class="form-control" 
                            id="passwordFormSignIn"
                            v-model="password"
                            required
                        >
                    </div>
                    
                    <button 
                        type="submit" 
                        class="btn btn-custom w-100 py-2 mt-3"
                        :disabled="!isValid"
                    >
                       <span> Sign In</span>
                    </button>
                </form>

                <div class="text-center mt-3 small">
                    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p
                    >
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Notification from '../Notification'

export default {
    name: 'SignIn', 
    components: { 
        Notification
    }, 
    data() {
        return { 
            email: '',
            password: '',
            notification: {
                message : '', 
                type: ''
            }
        }
    }, 
    computed: {
        isValid() {
            return this.email && this.password
        }
    }, 
    
    beforeRouteEnter ( to, from, next) { 
        const token = localStorage.getItem('blog-app-token')
        return token ? next('/') : next()
    },

    methods: { 
        signin() {  
            var forms = document.querySelectorAll('.needs-validation')  
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
                })

             window.axios.post('signin', { 
                email: this.email,
                password: this.password,
            })
                .then( response => {    
                    localStorage.setItem('blog-app-token', response.data.data.token)
                    this.$router.push('/')
                })
                .catch( error => {
                    this.email = ''
                    this.password = ''
                    this.notification = { 
                        message: error.response.data.message,
                        type: error.response.data.status
                    }
                })
        }
    }
}
</script>

<style>

</style>