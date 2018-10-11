<template>
    <div class = "Category">
        <Header />
           <category v-bind:id = this.categoryId />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header'
import Category from '../components/Category'
import Footer from '../components/Footer'

export default {
    name: 'category-view',
    components: {
        Header,
        Category,
        Footer
    },
    props: ['categoryId']
}
</script>

<style>

</style>