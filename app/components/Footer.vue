<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto" role="contentinfo">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
        <div>
          <h3 class="text-white font-bold text-lg mb-3 flex items-center gap-2">
            <span class="text-2xl">🏨</span>
            HotelBooking
          </h3>
          <p class="text-sm text-gray-400">
            Sua plataforma de confiança para encontrar e reservar os melhores hotéis do Brasil.
          </p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3">Links Rápidos</h4>
          <nav aria-label="Links do rodapé">
            <ul class="space-y-2 text-sm">
              <li><NuxtLink to="/hotels" class="hover:text-white transition-colors">Buscar Hotéis</NuxtLink></li>
              <li><NuxtLink to="/compare" class="hover:text-white transition-colors">Comparar Quartos</NuxtLink></li>
            </ul>
          </nav>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3">Ajuda</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Central de Ajuda</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contato</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Política de Privacidade</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3">Contato</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:contato@hotelbooking.com.br" class="hover:text-white transition-colors">
                contato@hotelbooking.com.br
              </a>
            </li>
            <li class="flex items-center gap-2">
              <span>📱</span>
              <span>(11) 1234-5678</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} HotelBooking. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>
