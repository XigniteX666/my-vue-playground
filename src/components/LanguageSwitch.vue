<template>
    <div class="language-swith">
        <span  v-on:click="changeLanguage('NL')">NL</span> | <span v-on:click="changeLanguage('EN')">EN</span>
    </div>
</template>

<script>
export default {
    name: "language-switch",
    methods:{
        changeLanguage(lang) { 
            this.$store.commit('setLanguage', lang)  
        }
    }
}
</script>

<style>

</style>
