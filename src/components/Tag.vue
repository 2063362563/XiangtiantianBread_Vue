<template>
    <div class="tabs">
        <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)"
            @close="handleClose(item, index)" size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<style>
.tabs{
    padding: 20px;
    padding-bottom: 0px;
    
}
.el-tag {
    margin-right: 15px;
    cursor: pointer;
    
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Tag',
    data() {
        return {

        };
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations([
            'closeTag'
        ]),
        changeMenu(item) {
            this.$router.push({ name: item.name })
        },
        handleClose(item, index) {
            this.closeTag(item)
            const length = this.tags.length 
            if (item.name !== this.$route.name) {
                return
            }
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>