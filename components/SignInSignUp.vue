<template>
  <div class="auth-container">
    <div class="tabs">
      <button
        class="tab-button"
        :class="{ active: isLoginTab }"
        @click="isLoginTab = true"
      >
        Giriş
      </button>
      <button
        class="tab-button"
        :class="{ active: !isLoginTab }"
        @click="isLoginTab = false"
      >
        Hesap Oluştur
      </button>
    </div>

    <div class="form">
      <!-- Giriş Formu -->
      <div v-if="isLoginTab">
        <p style="color: #cf0a2c;">* Zorunlu alanları belirtir</p>
        <form @submit.prevent="signIn">
          <div class="form-group">
            <input type="email" v-model="loginEmail" placeholder="* Eposta" />
          </div>
          <div class="form-group">
            <input type="password" v-model="loginPassword" placeholder="* Parola" />
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="remember" />
            <label for="remember">Beni hatırla</label>
          </div>
          <br>
          <button type="submit" class="button">Giriş</button>
           <p v-if="loginError" style="color: red;">{{ loginError }}</p>
        </form>
        <p>
          Hesabınız yok mu?
          <span @click="isLoginTab = false" class="link">Şimdi bir tane oluşturun</span>
        </p>
      </div>

      <!-- Hesap Oluşturma Formu -->
      <div v-else>
         <p style="color: #cf0a2c;">* Zorunlu alanları belirtir</p>
        <form @submit.prevent="signUp">
           <div class="form-group">
            <input type="text" v-model="signUpFirstName" placeholder="Adınız" />
          </div>
          <div class="form-group">
            <input type="text" v-model="signUpLastName" placeholder="Soyadınız" />
          </div>
          <div class="form-group">
            <input type="email" v-model="signUpEmail" placeholder="E-mail" />
          </div>
          <div class="form-group">
            <input type="text" v-model="signUpPhone" placeholder="Cep Telefonu" />
          </div>
          <div class="form-group">
            <input type="password" v-model="signUpPassword" placeholder="Parola" />
            <ul>
              <li>Parola Gereksinimleri:</li>
              <br>
              <li>• Minimum 6 karakter</li>
              <li>• En az bir büyük harf</li>
              <li>• En az bir küçük harf</li>
              <li>• En az bir sayı</li>
              <li>• En az bir özel karakter (! @ # $ % &)</li>
            </ul>
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="terms1" />
            <label for="terms">Üyelik Sözleşmesini ve Kişisel Verilerimin Korunması'nı ve <br>Aydınlatma Metnini okudum, kabul ediyorum.</label>
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="terms2" />
            <label for="terms">Kampanyalar ile ilgili eposta mesajlarını almak istiyorum ve <br>Sms ile özel indirimlerden haberdar olmak istiyorum, <br>Açık Rıza Metnini, okudum kabul ediyorum.</label>
          </div>
          <button type="submit" class="button">Hesap Oluştur</button>
           <p v-if="signUpError" style="color: red;">{{ signUpError }}</p>
        </form>
        <p>
          Zaten hesabınız var mı?
          <span @click="isLoginTab = true" class="link">Giriş</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNuxtApp } from '#app'
import { useAuth } from '~/composables/useAuth';
const { user } = useAuth();

const { $auth } = useNuxtApp();
const isLoginTab = ref(true);

// Sign In Form Data
const loginEmail = ref('');
const loginPassword = ref('');
const loginError = ref(null);

// Sign Up Form Data
const signUpFirstName= ref('');
const signUpLastName = ref('');
const signUpEmail = ref('');
const signUpPhone= ref('');
const signUpPassword = ref('');
const signUpError = ref(null);

const signIn = async () => {
  try {
    loginError.value = null;
    const userCredential = await signInWithEmailAndPassword($auth(), loginEmail.value, loginPassword.value);
    
    // Auth durumunun güncellenmesi için bekleyelim
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Kullanıcının gerçekten giriş yaptığından emin olalım
    if (userCredential.user) {
      console.log("Giriş başarılı, kullanıcı ID:", userCredential.user.uid);
      navigateTo('/');
    } else {
      throw new Error("Kullanıcı bilgisi alınamadı");
    }
  } catch (error) {
    console.error("Giriş hatası:", error);
    loginError.value = error.message;
  }
};

const signUp = async () => {
    try {
       signUpError.value = null;
        await createUserWithEmailAndPassword($auth(), signUpEmail.value, signUpPassword.value);
         // Redirect or handle successful sign-up
        navigateTo('/');
    } catch (error) {
       signUpError.value = error.message;
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin-left: 200px;
  padding: 20px;
}
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.tab-button {
  padding: 20px 40px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid transparent;
}
.tab-button.active {
  border-color: #cf0a2c;
  font-weight: bold;
  color: #cf0a2c;
}
.form-group {
  margin-bottom: 20px;
  position: relative;
}
label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}
input {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  background: transparent;
  transition: border-color 0.3s;
}
input:focus {
  border-bottom-color: #cf0a2c;
}
ul {
  list-style-type: none;
  padding-left: 0;
  font-size: 12px;
  color: #555;
}
.checkbox-group {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.button {
  background-color:#cf0a2c;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  width: 50%;
  height: 60px;
}
.link {
  color: black;
  cursor: pointer;
  text-decoration: underline;
}
</style>