<template>
     <div class="cars">
          <Header />
          <CarList />
          <Car />
          <Footer />
     </div>
</template>

<script>

import Header from '../components/Header'
import Footer from '../components/Footer'
import CarList from '../components/CarList'
import Car from '../components/Car'

export default {
    name: 'cars',
    components: {
        Header,
        Footer,
        CarList,
        Car
    }
}
</script>

<style>

</style>
