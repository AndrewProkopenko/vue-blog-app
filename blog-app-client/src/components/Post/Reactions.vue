<template>
    <div class="d-flex ">
        <a class="d-flex align-items-center text-decoration-none text-dark mx-3">
            <svg   width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-chat mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>
            {{this.replies.length}}
        </a>
        <a class="mx-2" href="/" v-if="isMyFavorite" @click.prevent="unfavorite">
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="rgb(255, 0, 80)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
        </a>
        <a  class="mx-2"  href="/" v-else @click.prevent="favorite">
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-heart" fill="rgb(0, 0, 0)" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
        </a>
        <div class="toast" v-show="unsignedFollow"   style="position: fixed; z-index: 10; top: 10px; right: 10px; opacity: 1">
            <div class="toast-header"> 
                <strong class="mr-auto">Hi</strong> 
                <button @click="closeAlert" type="button" class="ml-2 mb-1 close" >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                Like this post? 
                <router-link to="/signin">Sign In</router-link>
                to follow!
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Reactions', 
    props: { 
        post: {
            type: Object,
            required: true
        }, 
        authUser: {
            type: Object,
            required: true
        }, 
        replies: {
            type: Array,
            required: true
        }, 
        favorites: {
            type: Array,
            required: false
        }
    }, 
    data() {
        return {
            unsignedFollowData: false
        }
    },
    computed: { 
        isMyFavorite() { 
            for( let fav of this.favorites) { 
                if ( fav.user_id === this.authUser.id ) { 
                    return true
                } 
            } 
            return false
        }, 
        unsignedFollow() {
            return !!this.unsignedFollowData
        }
    }, 
    created() { 
       

    },
    methods: { 
        favorite() { 
            const token = localStorage.getItem('blog-app-token') 
            if(!token) { 
                this.unsignedFollowData = true
            }

            window.axios.post(`/favorites/add`, { 
                post_id: this.post.id
            }, { 
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
            })
            .then( (response) => {
                this.favorites.push(response.data.data)
            })
        }, 
        unfavorite() {
            const token = localStorage.getItem('blog-app-token') 
            

            window.axios.delete(`/favorites/delete/${this.post.id}`, { 
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
            })
            .then( () => { 
                const filtered = this.favorites.filter( fav => {
                    return fav.user_id !== this.authUser.id
                })
                this.$emit('update:favorites', filtered) 
            })
        },
        closeAlert() { 
              this.unsignedFollowData = false
        }
    }
}
</script>

<style>

</style>