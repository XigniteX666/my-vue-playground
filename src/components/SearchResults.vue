<template>
    <div class="searchResults">
        Number of search results: {{ searchResults.count }}
        {{ searchResults.results }}
        <Product  v-for = "product in searchResults.results" v-bind:product = product :key="product.id"/>
    </div>
</template>

<script>
import Product from './Product'

export default {

    name: "SearchResults",
    props:{
        searchResults:{
            type: Object,
            required: true
        }
    },
    components:{
        Product
    }
}
</script>

<style>

</style>
