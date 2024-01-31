Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="inStock">In Stock</p>
            <P v-else :class="{outOfStock: !inStock}">Out of stock</P>
            <p>{{ sale }}</p>
            <product-details :details="details"></product-details>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{backgroundColor:variant.variantColor}"
                 @mouseover="updateProduct(index)">
            </div>
            <p>Shipping: {{shipping}}</p>
            <a :href="link">More products like this</a>
        </div>
        <div class="cart">
            <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to cart</button>
            <button v-on:click="removeFromCart">Del from cart</button>
        </div>
    </div>`,
    data() {
        return {
            product: "Socks",

            brand: "Vue Mastery",

            description: "A pair of warm, fuzzy socks",

            selectedVariant: 0,

            altText: "A pair of socks",

            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",

            inventory: 100,

            onSale: true,

            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],

            details: ['80% cotton', '20% polyester', 'Gender-neutral'],

            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL',],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {return this.brand + ' ' + this.product + ' в распродаже прямо сейчас!'}
            else {return this.brand + ' ' + this.product + ' сейчас отсутствует в распродаже!'}
        },
        shipping() {
            if (this.premium) return "Free"
            else return 2.99
        }

    }
})

Vue.component('product-details', {
    props: {
      details: {
          type: Array,
          required: true,
      }
    },
    template:`
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        deleteCartItem(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1)
                }
            }
        }
    }
})