<template>

    <button @click="dianji">点我领取地狱火</button>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            data: {
                tableData:[]
            }
        }
    },
    methods: {
        dianji: function () {
            console.log("123456789");
            axios.get("/api/employee/getAllEmployee").then((response) => {
                console.log(response);
                this.tableData = response.data
            })

        }
    }
}
</script>
<!-- <script>
import axios from '../axios/index';
export default {
    data() {
        return {
            data: {

            }

        };
    },
    created: function () {
        axios.get(this.HOST + "/employee/jack").then(function (response) {
            console.log(response)
        })
    },
    methods: {
        dianji() {
            axios.get(this.HOST + "/employee/jack").then(function (response) {
                console.log(response)
            })
        }

    },
    computed: {

    }
};
</script> -->