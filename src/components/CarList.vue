<template>
    <div>
     <button v-on:click="callService">Click</button><br/>
     <ul>
            <li v-for="car in cars" :key="car.plateNumber">
                {{ car.brandName }} - {{ car.type }} - {{ car.plateNumber }}
            </li>
    </ul>
    </div>
</template>

<script>

import axios from 'axios'


export default {
     props: {
        cars: {
            type: String,
            required: true
        }
    },
    methods:{
        callService: function () {
           axios
                .get('http://localhost:3000/cars')
                .then(response => (this.cars = response.data))
        }
    }
}
</script>

<style>

</style>
