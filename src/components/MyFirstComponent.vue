<template>
    <span>
        <p>{{ count }}</p>
        <h1>Hi, {{ msg }}</h1>
        <span v-if="seen">Now you see me</span>
        <input v-model="msg">
        <input @input="changed" name="flavor">
        <button v-on:click="reverseMessage">Reverse Message</button><br/>
        <a v-on:click="test($event)">click</a> 
    </span>
</template>

<script>
export default {
    name: 'MyFirstComponent',
    props: {
        msg: {
            type: String,
            required: true
        },
        seen: {
            type: Boolean,
            required: true
        }
    },
    data(){
        return {
            items: [1, 2, 3]
        }
    },
    methods:{
        reverseMessage: function () {
            this.msg = this.msg.split('').reverse().join('')
        },
        test:function(event){
            console.log(event);
            alert(this.msg);
        },
         changed: function(event) {
            this.$store.commit('change', event.target.value)
        }
    },
    computed:{
        count: function() {
            return 'The count is ' + this.items.length * 10
        }
    },
    // watch:{
    //     msg: function(newValue, oldValue){
    //         alert(oldValue);
    //         alert(newValue);
    //     }
    // }
}
</script>

<style>

</style>

