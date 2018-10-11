<template>
    <div class = "commercetools">
        <Header />
        <SearchBox />
        <Footer />
    </div>
</template>

<script>

import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBox from '../components/SearchBox'
import SearchResults from '../components/SearchResults'


export default {
    name: 'commercetools',
    components: {
        Header,
        SearchBox,
        SearchResults,
        Footer,
    }
}
</script>

<style>

</style>