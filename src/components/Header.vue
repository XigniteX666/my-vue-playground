<template>
    <span>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/search">Search</router-link> | 
            <router-link to="/playground">Playground</router-link> |  
            <router-link to="/cart">Cart</router-link> |
            <router-link to="/about">About</router-link>
            <router-view/>

            <Categories />
            <mini-cart/>
        </div>
    </span>
</template>

<script>

import Categories from '../components/Categories'
import miniCart from '../components/MiniCart'

export default {
components: {
        Categories,
        miniCart
    }
}
</script>

<style>

</style>
