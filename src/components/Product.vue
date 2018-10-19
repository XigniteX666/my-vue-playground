<template>
    <div>
        Product
         <router-link :to="{ name: 'product', params: { productSlug: product.id } }">
            <div class="product-info-main">
                id: {{ product.id }} <br/>
                name: {{ product.masterData.current.name }} <br/>
            </div>
         </router-link>
    </div>
</template>

<script>
export default {
    name: 'product',
    props:{
        product:{
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.product-info-main {
    border: 1px solid #CEEFFF;
    margin-bottom: 20px;
    margin-top: 10px;
    background: #fff;
    padding: 6px;
    -webkit-box-shadow: 0 1px 4px 0 rgba(21,180,255,0.5);
    box-shadow: 0 1px 1px 0 rgba(21,180,255,0.5);
}
</style>
