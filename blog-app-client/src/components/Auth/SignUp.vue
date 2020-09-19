<template>
    <div class="container p-3">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-lg-6">
               <div class="content-item mt-4">
                    <h3 class=" text-center font-weight-bold">Sign Up</h3>

                <Notification
                    :message = "notification.message"
                    :type = "notification.type"
                    v-if="notification"
                />

                <form @submit.prevent="signup" class="needs-validation" novalidate=''>
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
                        <label for="passwordFormSignUp" class="form-label">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            class="form-control" 
                            id="passwordFormSignUp"
                            v-model="password"
                            required
                        >
                    </div>
                    
                    <button 
                        type="submit" 
                        class="btn btn-custom w-100 py-2 mt-3"
                        :disabled="!isValid"
                    >
                       <span> Sign Up</span>
                    </button>
                </form>

                <div class="text-center mt-3 small">
                    <p>Already have an account? <router-link to="/signin">Sign In</router-link></p
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
    name: 'SignUp', 
    components: { 
        Notification
    }, 
    data() {
        return {
            name: '',
            username: '',
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
            return this.name && this.username && this.email && this.password
        }
    }, 
    
    beforeRouteEnter ( to, from, next) { 
        const token = localStorage.getItem('blog-app-token')
        return token ? next('/') : next()
    },
    methods: { 
        signup() {  
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

            window.axios.post('signup', {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
            })
                .then( response => {    
                    localStorage.setItem('blog-app-token', response.data.data.token)
                    this.$router.push('/')
                })
                .catch( error => { 
                    this.notification = { 
                        message: error.data.message,
                        type: error.data.status
                    }
                })
        }
    }
}
</script>

<style>

</style>