<template>
    <span>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/search">Search</router-link> | 
            <router-link to="/playground">Playground</router-link> |  
            <router-link to="/about">About</router-link>
            <router-view/>

            <Categories />
        </div>
    </span>
</template>

<script>

import Categories from '../components/Categories'

export default {
components: {
        Categories
    }
}
</script>

<style>

</style>
