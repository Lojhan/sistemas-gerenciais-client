<template>
    <section class="container grid mt-5">
        <div class="card mx-auto mb-4" style="width: 18rem;" v-for="(product, index) in products" :key="product.uuid" @click="navigate(product.uuid)">
            <img src="https://picsum.photos/200/150" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-text">{{ product.product.name }}</h5>
            </div>
            </div>
    </section>
</template>

<script>
import requests from '../plugins/requests'
export default {
    data() {
        return {
            products: null,
        }
    },

    mounted() {
        this.getProducts()
    },
    methods: {
        async getProducts() {
        const { data } = await requests.products()
        this.products = data
        },
        navigate(uuid) {
            this.$router.push('products/' + uuid)

        }
    }
}

</script>

<style scoped>
   @media (min-width: 700px) { 
        .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        }
    }
    @media (min-width: 900px) { 
        .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        }
    }
</style>