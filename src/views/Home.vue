<template>
  <figure class="max-w-screen-md mx-auto text-center mt-2 mb-10">
      <svg class="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
      </svg>
      <blockquote>
          <p class="text-2xl italic font-medium text-gray-900 dark:text-white">"Detrás de un gran maestro hay discípulos que protegen su legado y lo eternizan"</p>
      </blockquote>
      <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite class="pe-3 font-medium text-gray-900 dark:text-white">Dra. Glenda Arriciaga Vaca</cite>
              <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">Psicoterapeuta Integrativa</cite>
          </div>
      </figcaption>
  </figure>

  <div class="flex items-center justify-center gap-10">
    <img src="../pictures/dr.png" class="w-[200px]" alt="">
    <blockquote class="mb-3">
      <p class="text-xl italic font-semibold text-gray-900 dark:text-white">"Las Guías del proceso psicoterapéutico son instrumentos para monitorizarlo con el augurio de favorecer una práctica organizada y sistematizada que supere la improvisación"</p>
      <p class="pl-10 pt-4">Dr. Lucio Balarezo Chiriboga, Gestor del MIFP</p>
    </blockquote>
  </div>

  <div class="flex justify-center py-10">
    <ol class="md:grid grid-cols-3">
        <li v-for="(item, index) in content" :key="index" class="relative mb-6 sm:mb-0">
            <div class="z-10 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white w-6 h-6 bg-blue-100 rounded-full ring-0 ring-light dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <font-awesome-icon icon="fa-solid fa-door-open" />
            </div>
            <div class="mt-3 sm:pe-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ item.subtitle }}</time>
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">{{ item.description }}</p>
            </div>
        </li>
    </ol>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { router } from '@/routes';

const auth = getAuth();

onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push('/');
    }
  })
})
const content = [
  {
    title: 'Nuevo Paciente',
    subtitle: 'Registra un nuevo paciente para iniciar un proceso',
    description: 'El registro de un nuevo paciente supone el ingreso de todos sus datos personales y su biografía psicológica.'
  },
  {
    title: 'Lista de pacientes',
    subtitle: 'Consulta tus pacientes, búscalos por nombre o número de cédula',
    description: 'Para iniciar un proceso con un paciente, búscalo en tu lista y accede a sus datos.'
  },
  {
    title: 'Perfil',
    subtitle: 'Ingresa a tu perfil, revisa y configura tus datos',
    description: 'El apartado de perfil ayuda a mejorar tu experiencia de usuario y contactarte con el administrador.'
  }
]

</script>