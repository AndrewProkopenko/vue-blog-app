<template>
   <div>
        <div class="card mb-3"  v-for="reply in replies" :key="reply.id">
            <div class="row g-0">
                <div class="col-md-2">
                    <div class="d-flex justify-content-center align-items-center h-100">
                        
                        <img class="rounded-circle post-image" src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"  alt="...">
                        
                    </div>
                </div>
                <div class="col-md-10">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <router-link class="link-primary text-decoration-none" :to="`${reply.user.username}`">
                           {{reply.user.name}}
                            <small>
                                @{{reply.user.username}}
                            </small>
                        </router-link>
                        <p class="card-text">
                            <small class="text-muted">
                                    {{ reply.created_at | timeAgo }}
                            </small>
                        </p>
                    </div>
                   
                    <p class="card-text text-dark">
                         {{reply.content}}
                    </p>
                   
                </div>
                </div>
            </div>
        </div>
   </div>
    
</template>

<script>
export default {
    name: 'Replies', 
    props: { 
        replies: {
            type: Array, 
            required: true
        }
    }, 
}
</script>

<style>

</style>