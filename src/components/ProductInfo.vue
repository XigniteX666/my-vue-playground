<template>
 <router-link :to="{ name: 'product', params: { productSlug: product.id } }">
    <div>
        <div>{{ product.masterData.current.name }} </div>   
        <div>{{ product.masterData.current.description }} </div>  
        <div>{{ product.masterData.current.masterVariant.price.value.centAmount }} </div>  
    </div>
 </router-link>
</template>

<script>
export default {
    name: 'ProductInfo', 
    props:{
        product:{
            type: Object,
            required: true
        }
    }

}
</script>

<style>

</style>
