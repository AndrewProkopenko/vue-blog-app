<template>
    <div>
        <router-link to="/" class="btn btn-custom w-100">Home</router-link>
        <div class="list-group mt-3">
                <router-link 
                    class="list-group-item list-group-item-action" 
                    to="/settings/profile">
                    Edit Profile
                </router-link> 
                <router-link 
                    class="list-group-item list-group-item-action" 
                    to="/settings/password">
                    Edit Password
                </router-link> 
        </div>
    </div> 
</template>
 
<script>
export default {
    name: 'UserSettingsMenu'
}
</script>