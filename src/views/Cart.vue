<template>
    <div class = "cart">
        <Header />
           <cart />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header'
import Cart from '../components/Cart'
import Footer from '../components/Footer'

export default {
    name: 'cart-view',
    components: {
        Header,
        Cart,
        Footer
    }
}
</script>

<style>

</style>