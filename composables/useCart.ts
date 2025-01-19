import { ref, computed } from 'vue';

interface CartItem {
    id: string;
    title: string;
    price: string;
    image: string;
    category: string;
    quantity: number;
    size: string | undefined;
    detailsUrl: string;
}

const cartItems = ref<CartItem[]>([]);

export function useCart() {
    const addToCart = (product: any, selectedSize?: string) => {
        const existingItemIndex = cartItems.value.findIndex(
            (item) => item.id === product.title && item.size === selectedSize
        );

        if (existingItemIndex !== -1) {
            cartItems.value[existingItemIndex].quantity++;
        } else {
            cartItems.value.push({
              id: product.title,
              title: product.title,
              price: product.price,
              image: product.image, // Ürünün resmini ekliyoruz
              category: product.category,
              quantity: 1,
              size: selectedSize,
              detailsUrl: product.detailsUrl
            });
        }
    };

    const removeFromCart = (index: number) => {
        cartItems.value.splice(index, 1);
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
    };
}