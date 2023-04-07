import Vue from "vue"
import Vuex from 'vuex'


Vue.use(Vuex)

//创建vuex的实例
const store = new Vuex.Store({
    state: {
        //记录登录信息
        userinfo: {},
        isCollapse: false, //控制左侧菜单展开与收起
        //面包屑的列表
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'el-icon-s-home',
                url: 'Home/Home',
            },
        ],
        //顾客的购物车信息
        cart: [],
    },
    getters: {
        totalPrice: state => {
            return state.cart.reduce((total, item) => total + item.price * item.num, 0);
        }
    },
    mutations: {
        addCart(state, { goodId, goodName, price, num }) {
            let item = state.cart.find((item) =>
                item.goodId === goodId
            );
            if (item) {
                item.num += num;
            } else {
                state.cart.push({ goodId: goodId, goodName: goodName, price: price, num: num });
            }
        },
        deleteCart(state, goodName) {
            let itemIndex = state.cart.findIndex((item) => item.goodName === goodName);
            if (itemIndex !== -1) {
                state.cart.splice(itemIndex, 1);
            }
        },
        cleanCart(state) {
            state.cart = []
        },
        login(state, data) {
            state.userinfo = data
        },
        logout(state) {
            state.userinfo = {}
            localStorage.clear
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
// 在页面加载时，从localStorage中读取数据
if (localStorage.getItem('store')) {
    store.replaceState(Object.assign({}, store.state, JSON.parse(localStorage.getItem('store'))))
}

// 在每次mutation后，将state存储到localStorage中
store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
})
export default store
