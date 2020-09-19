<template>
     <div class="alert   mb-1" :class='`alert-${type}`' >
        {{ message }} 
    </div>
</template>

<script>
export default {
    name: 'Notification', 
    props: { 
        message: { 
            type: String, 
            required: true
        },
        type: { 
            type: String, 
            required: true
        }
    }
}
</script>

<style>
    .alert-error { 
        border-color: #9c0000;
        color: #9c0000;
        background-color: #9c000042;
    }
    /* .alert-success { 
        border-color: #009c34;
        color: #006e25;
        background-color: #009c3457;
    }
    .alert-warning { 
        border-color: #c8eb05;
        color: rgba(0, 0, 0, 0.568);
        background-color: #c9eb0577;
    } */
</style>