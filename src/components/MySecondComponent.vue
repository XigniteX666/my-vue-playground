<template>
    <div>
        You typed {{ flavor }} <br />
        count {{ count }} <button v-on:click="action_increment">Verhoog</button><br/>
        <button v-on:click="getsession">Get session</button><br/>
        <button v-on:click="callService">Click</button><br/>
        <ul>
            <li v-for="item in msg" :key="item.code">
                {{ item.code}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            result: 'placeholder'
        }
    },
    methods:{
        callService: function () {
           axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => (this.msg = response.data.bpi))
        },
        increment: function (){
            this.$store.commit('increment');
        },
        action_increment: function(){
            this.$store.dispatch('increment')
        }, 
        getsession: function(){
            this.$store.dispatch('generateToken')
        } 
    }, 
    computed:{
        flavor(){
           return "hi" + this.$store.getters.flavor;
        },
        count(){
            return this.$store.getters.count;
        }
    }
}
</script>

<style>

</style>
