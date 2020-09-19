<template>
   <div class="container mt-3 mb-5">
        <div class="row">
            <div class="col-12 col-sm-3">
                  <UserSettingsMenu/> 
            </div>
            <div class="col-sm-1"></div>
            <div class="col-12 col-sm-8 col-lg-4">
                <h2 class="text-center">
                    Edit Password 
                </h2>
                <Notification
                    :message = "notification.message"
                    :type = "notification.type"
                    v-if="notification"
                />
                
                <form @submit.prevent="updatePassword" class="needs-validation" novalidate=''> 
                    <div class="mb-2">
                        <label for="password" class="form-label">Current Password</label>
                        <input 
                            name="password"
                            type="password" 
                            class="form-control" 
                            id="password" 
                            v-model="password"
                            required
                        > 
                        <div class="valid-feedback">
                            This fields required
                        </div>
                    </div>


                    <div class="mb-2">
                        <label for="newPassword" class="form-label">New Password</label>
                        <input 
                            name="newPassword"
                            type="password" 
                            class="form-control" 
                            id="newPassword" 
                            v-model="newPassword"  
                            required
                        > 
                        <div class="valid-feedback">
                            This fields required
                        </div>
                    </div>
 
                    <div class="mb-2">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input 
                            name="confirmPassword"
                            type="password" 
                            class="form-control" 
                            id="confirmPassword" 
                            v-model="confirmPassword"
                            @change="checkPassword"
                            required
                        > 
                        <div class="valid-feedback">
                            This fields required
                        </div>
                    </div>
 
                    
                    <button 
                        type="submit" 
                        class="btn btn-custom w-100 py-2 mt-3"
                        :disabled="!isValid"
                    >
                       Change Password
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
 name: "UserPasswordSettings", 
    components: { 
        UserSettingsMenu,
        Notification
    },
    data() { 
        return { 
            password: '',
            newPassword: '',
            confirmPassword: '',
            notification: {
                message : '', 
                type: ''
            }
        }
    }, 
    computed: {
        isValid() {
            return this.newPassword === this.confirmPassword 
        }
    }, 
    beforeRouteEnter ( to, from, next) { 
        const token = localStorage.getItem('blog-app-token') 
        return token ? next() : next ('/signin')
    },
    methods: { 
        updatePassword() { 
            const token = localStorage.getItem('blog-app-token') 
            window.axios.put('/profile/password', { 
                currentPassword: this.password,
                newPassword: this.newPassword,
            } , { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then( response => { 
                    this.password = this.confirmPassword = this.newPassword = ''
                    this.notification = { 
                        message : response.data.message, 
                        type: response.data.status
                    }
                })
                .catch( error => { 
                    this.password = this.confirmPassword = this.newPassword = '' 
                    console.log(error.response)
                    this.notification = { 
                        message : error.response.data.message, 
                        type: error.response.data.status
                    }
                })
        }, 
        checkPassword() { 
            setTimeout( () => { 
                if( this.newPassword !== this.confirmPassword && this.confirmPassword !== '' ) { 
                    this.notification = { 
                        message : 'Password mismatch', 
                        type: 'warning'
                    }
                } else { 
                    this.notification = { 
                        message : '', 
                        type: ''
                    }
                }
            }, 100)
        }
    }
}
</script>

<style>

</style>