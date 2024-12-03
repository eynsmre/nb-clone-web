<template>
  <footer class="bg-gray-50">
      <div class="bg-black text-white text-center py-4">
          <div class="container mx-auto flex flex-row items-center justify-center space-y-2">
              <span class="text-sm mx-3">Üye ol, yeni sezonu ve koleksiyonlarımızı sen keşfet!</span>
              <button class="bg-red-600 hover:bg-red-700 text-white px-16 py-4 transition duration-200">
                  Üye Ol
              </button>
          </div>
      </div>

      <div class="container mx-auto grid grid-cols-12 gap-8 py-8">
          <div class="col-span-2">
              <ul class="space-y-2">
                  <li class="font-medium">Mağazalar</li>
                  <li>Kargo Takip</li>
                  <li>Bize Ulaşın</li>
              </ul>
          </div>

          <div class="col-span-2">
              <h5 class="font-bold mb-4">Kurumsal</h5>
              <ul class="space-y-2">
                  <li>Hakkımızda</li>
                  <li>Veri Politikası</li>
                  <li>KVKK</li>
                  <li>Ticari Ünvan</li>
                  <li>Gizlilik ve Çerez</li>
                  <li>Çerez Ayarları</li>
              </ul>
          </div>

          <div class="col-span-2">
              <h5 class="font-bold mb-4">Müşteri İlişkileri</h5>
              <ul class="space-y-2">
                  <li>Teslimat ve Kargo</li>
                  <li>İade ve Değişim</li>
                  <li>Sıkça Sorulan Sorular</li>
                  <li>İşlem Rehberi</li>
                  <li>Ürün İnceleme</li>
                  <li>Mesafeli Satış Sözleşmesi</li>
                  <li>Gizlilik Sözleşmesi</li>
                  <li>Kullanıcı Sözleşmesi</li>
                  <li>Ürün Bakımı</li>
              </ul>
          </div>

          <div class="col-span-3"></div>

          <div class="col-span-3">
              <div class="flex flex-col">
                  <img
                      src="data:image/jpeg;base64,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"
                      alt="Logo"
                      class="w-16 h-auto mb-4"
                  />
                  <p class="text-black leading-8">
                      Spor ayakkabıdan daha büyük bir şey için mücadele ediyoruz. Tutkularının peşine kapılanları temsil ediyoruz. Sporu geliştiriyoruz. İnsanları ve gezegeni koruyoruz. Birlikte, dünyadaki topluluklarda anlamlı bir
                      değişime öncülük ediyoruz. Şimdi ya da asla: Anı yaşa.
                  </p>
              </div>
          </div>
      </div>

      <div class="text-center py-4 border-t border-gray-200 text-sm text-gray-500">
          ©2024 New Balance Her Hakkı Saklıdır
      </div>
  </footer>
</template>

<script>
  export default {};
</script>

<style scoped></style>
