<template>
    <div>
        <div v-on:click="switchData('production')">PRODUCTION</div>
        <div v-on:click="switchData('stage')">STAGING</div>

        <div>
            <h1>Product information</h1>
            <div>{{ details.name.en }}</div>
            <div>{{ details.description.en }} </div>
            <img v-bind:src= details.masterVariant.images[0].url v-if="details.masterVariant.images[0] !=null"/>
        </div>
          
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductDetails', 
    props:{
        id:{
            type: String,
            required: true
        },
        productionData:{
            type: String
        },
        details:{
            type: Object
        }
    }, 
    methods:{
        switchData(type){
            let config = {
                headers: {
                    'Authorization':'Bearer ' + this.$store.getters.token
                    }
            }
            if(type == "stage"){
                axios
                .get("https://api.sphere.io/myplayground-68/products/"+ this.id, config)
                .then(response => this.details = response.data.masterData.staged)
            }else{
                axios
                 .get("https://api.sphere.io/myplayground-68/products/"+ this.id, config)
                .then(response => this.details = response.data.masterData.current)
            }
        }
    },
    created(){
         let config = {
                headers: {
                    'Authorization':'Bearer ' + this.$store.getters.token
                    }
            }
            axios
                .get("https://api.sphere.io/myplayground-68/products/"+ this.id, config)
                .then(response => this.details = response.data.masterData.current)
    }
}
</script>

<style>

</style>
