<template>
    <!-- <h1>
        折扣专区
    </h1> -->
    <div>
        {{ this.$store.state.count }}
        <button @click="add">
            +1
        </button>
    </div>
</template>
<script>
export default {
    
    // methods: {
    //     this.$store.state.count = this.$store.state.count + 1
    // }
}
</script>