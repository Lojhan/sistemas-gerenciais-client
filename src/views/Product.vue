<template>
    <div v-if="loaded" class="container mt-5">
        <img src="https://picsum.photos/1000/400" alt="" class="mx-auto">
        <h1 class="display-1 mt-4">{{product.product.name}}</h1>
        <section>
            <h2>R$ {{product.inStockValue}}</h2>
        </section>
        <div class="w-50 mt-3">
            <label for="vertical" class="d-block mb-2" >Quantidade ({{product.quantity}} Disponíveis)</label>
            <InputNumber 
                class="w-25 mx-auto" 
                :max="product.quantity" 
                id="vertical" 
                v-model="quantity" 
                mode="decimal" 
                showButtons buttonLayout="vertical"
                decrementButtonClass="p-button-primary" 
                incrementButtonClass="p-button-primary" 
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
            />
        </div>
        <button @click="addToCart" class="btn btn-primary" label="Adicionar ao carrinho" >Adicionar ao carrinho</button>
    </div>
</template>

<script>
import requests from '../plugins/requests'
export default {
    data() {
        return {
            product: null,
            loaded: false,
            quantity: 1
        }
    },

    mounted() {
        this.getProduct()
    },
    methods: {
        async getProduct() {
        const { data } = await requests.product(this.$route.params.id)
        this.product = data
        this.loaded = true
        },
        addToCart() {
            this.$store.commit('addToCart', { product: this.product, quantity: this.quantity })
        }
    }
}

</script>

<style scoped>
    button {
        position: fixed;
        bottom: 20px;
        width: 700px;
        margin-inline: auto;
    }
</style>