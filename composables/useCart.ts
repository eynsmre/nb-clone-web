import { ref, onMounted, watch, type Ref } from 'vue';
import { useNuxtApp } from '#app';
import { useAuth } from './useAuth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
const { $firestore } = useNuxtApp();
const { user } = useAuth();
const LOCAL_STORAGE_KEY = 'localCart';

export function useCart() {
    const loading = ref<boolean>(false);
    const authLoading = ref<boolean>(true) // use a ref to track auth loading state
    const loadCartFromFirestore = async () => {
        console.log("loadCartFromFirestore başlatıldı");
        loading.value = true;
        if (!user.value?.uid) {
            console.log("Kullanıcı girişi yapmamış. Local storage'dan yükleniyor.");
            loadCartFromLocalStorage();
             loading.value = false;
            return;
        }
        const cartDocRef = doc($firestore(), "carts", user.value.uid);
        const cartDoc = await getDoc(cartDocRef);
        if (cartDoc.exists()) {
            cartItems.value = cartDoc.data().items;
            console.log("Sepet Firestore'dan yüklendi:", cartItems.value);
        } else {
            cartItems.value = [];
            console.log("Firestore'da sepet bulunamadı. Sepet boşaltıldı.");
             saveCartToLocalStorage();
        }
        loading.value = false;
    };

    const saveCartToFirestore = async () => {
        console.log("saveCartToFirestore başlatıldı. Sepet:", cartItems.value);

        if (!user.value?.uid) {
            console.log("Kullanıcı girişi yapmamış. Local storage'a kaydediliyor.");
             saveCartToLocalStorage()
            return;
        }
        console.log("Kullanıcı girişi yapmış. Firestore'a kaydediliyor.", user.value.uid);
        const cartDocRef = doc($firestore(), "carts", user.value.uid);
        console.log("Firestore belgesi referansı:", cartDocRef);

        try {
           await setDoc(cartDocRef, { items: cartItems.value });
            console.log("Sepet Firestore'a kaydedildi.");
       } catch (error) {
            console.error("Firestore'a kaydetme hatası:", error);
       }
    };

    const saveCartToLocalStorage = () => {
        console.log("saveCartToLocalStorage başlatıldı. Sepet:", cartItems.value);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems.value));
        console.log("Sepet local storage'a kaydedildi.");
    };

    const loadCartFromLocalStorage = () => {
        console.log("loadCartFromLocalStorage başlatıldı.");
        const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedCart) {
            cartItems.value = JSON.parse(storedCart);
            console.log("Sepet local storage'dan yüklendi:", cartItems.value);
        } else {
          console.log("Local storage'da sepet bulunamadı.");
          cartItems.value = [];
        }
    };

    const addToCart = async (product: any, selectedSize?: string) => {
        console.log("addToCart başlatıldı. Ürün:", product, "Beden:", selectedSize);

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
                image: product.image,
                category: product.category,
                quantity: 1,
                size: selectedSize,
                detailsUrl: product.detailsUrl
            });
        }
        console.log("Sepete ekleme sonrası sepet:", cartItems.value);
        await saveCartToFirestore();
    };

    const removeFromCart = async (index: number) => {
        console.log("removeFromCart başlatıldı. Silinecek index:", index);
        cartItems.value.splice(index, 1);
        console.log("Silme sonrası sepet:", cartItems.value);
        await saveCartToFirestore();
    };

    const clearCart = async () => {
        cartItems.value = [];
         await saveCartToFirestore();
    };
    
       onMounted(async () => {
      console.log("onMounted Tetiklendi")
      authLoading.value = true;
       await new Promise(resolve => setTimeout(resolve, 100))
       authLoading.value = false;
      loadCartFromFirestore();
       });

   watch(authLoading, (newLoading) => {
     if(!newLoading) {
        loadCartFromFirestore();
     }
   })


   watch(user, (newUser, oldUser) => {
        console.log("Kullanıcı değişti:", newUser?.uid);
        if (oldUser && !newUser) {
            console.log("Kullanıcı çıkış yaptı, sepet sıfırlandı.");
            cartItems.value = [];
            saveCartToLocalStorage();
        } else if (newUser) {
            console.log("Yeni kullanıcı giriş yaptı, sepet yükleniyor.");
            loadCartFromFirestore();
        }
    });


    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        loading
    };
}