import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

export function useAuth() {
    const { $auth } = useNuxtApp();
    const user = ref<User | null>(null);
    const loading = ref(true); // Add a loading ref
   
onMounted(() => {
  onAuthStateChanged($auth(), (currentUser) => {
    user.value = currentUser;
     loading.value = false;
   });
 });

    const signOutUser = async () => {
        try {
            await signOut($auth());
            user.value = null;
        } catch (error) {
          console.error("Çıkış yaparken bir hata oluştu:", error);
        }
     };

    return { user, signOutUser, loading };
}
