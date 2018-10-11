<template>
    <div class = "commercetools">
        <Header />
        <Categories />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Categories from '../components/Categories'
export default {
    name: 'commercetools',
    components: {
        Header,
        Categories,
        Footer
    }
}
</script>

<style>

</style>
