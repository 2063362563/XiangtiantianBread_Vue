import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

//创建vuex的实例
const store = new Vuex.Store({
    state: {
        userinfo:{
            
        },
        isCollapse: false, //控制左侧菜单展开与收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'el-icon-s-home',
                url: 'Home/Home',
            },
        ]
    },
    mutations: {
        login(state,data){
            state.userinfo = data
        },
        logout(state){
            state.userinfo = {}
        },
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        //点击Tag删除
        closeTag(state, item) {
            const index = state.tabsList.findIndex(val => item.name === val.name)
            state.tabsList.splice(index, 1)
        }
    }
})
export default store
