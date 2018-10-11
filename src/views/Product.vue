<template>
    <div class = "commercetools">
        <Header />
       <product-details v-bind:id = this.productSlug />
        <Footer />
    </div>
</template>

<script>

import Header from '../components/Header'
import ProductDetails from '../components/ProductsDetails'
import Footer from '../components/Footer'



export default {
    name: 'commercetools',
    props:{
        productSlug:{
            type: String,
            required: true
        }
    },
    components: {
        Header,
        ProductDetails,
        Footer
    }
}
</script>

<style>

</style>