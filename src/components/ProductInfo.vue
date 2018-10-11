<template>
    <div>
        <div>{{ product.masterData.current.name }} </div>   
        <div>{{ product.masterData.current.description }} </div>  
        <div>{{ product.masterData.current.masterVariant.price.value.centAmount }} </div>  
        dss
    </div>
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
