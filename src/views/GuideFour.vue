<template>
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <form action="" class="py-10" :style="{ opacity: opacity }">
        <h1 class="text-2xl font-bold text-center pb-4">ANÁLISIS DE LA PRIMER ENTREVISTA</h1>
        <RadioBox
            v-model:data="dataGuideFour"
            :content="content.slice(0, 1)"
            title-low="Complejo"
        />
        <RadioBox
            v-model:data="dataGuideFour"
            :content-yes-or-no="content.slice(1, 2)"
            :radio-yes-or-no="true"
        />
        <RadioBox
            v-model:data="dataGuideFour"
            :content-anormal="content[2]"
            :normal="false"
        />
        <div class="relative z-0 w-full mb-6 group bg-white">
            <input v-model="dataGuideFour['¿Qué dificultades se van a presentar en el proceso?']" type="text" name="floating" id="floating"
                class="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" " />
            <label for="floating_adress"
                class="peer-focus:font-medium pl-4 absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ content[3] }}</label>
        </div>
        <div class="flex justify-end">
            <ButtonVue class="p-2" variant="secondary" type="button" @click="checkValues">
                Enviar
            </ButtonVue>
        </div>
    </form>
</template>

<script setup>
import RadioBox from '../guide_components/RadioBox.vue';
import { reactive, ref } from 'vue';
import ModalAlert from '../general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import ButtonVue from '../general_components/ButtonVue.vue';

const dataGuideFour = reactive({
    'Paciente idóneo para tratamiento psicoterapéutico': '',
    'Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:': '',
    'Requiere intervención:': '',
    '¿Qué dificultades se van a presentar en el proceso?': ''
})
const { opacity, modalAlert, showModalAlert } = useModal();
const content = [
    'Paciente idóneo para tratamiento psicoterapéutico',
    'Requiere tratamiento mixto (psicoterapia, biológico, social) Especifique:',
    {
        title: 'Requiere intervención:',
        options: ['Individual', 'De pareja', 'Familiar', 'Grupal', 'Institucional']
    },
    '¿Qué dificultades se van a presentar en el proceso?'
]
const modalMessage = ref('');
const isEmpty = ref(false);

function checkValues(){
    isEmpty.value = false;
    modalMessage.value = '';

    for (const key in dataGuideFour){
        if(dataGuideFour[key].toString().trim() === ''){
            isEmpty.value = true;
            modalMessage.value = `El campo "${key}" esta vacío, por favor llénalo`
            break;
        }
    }
console.log(dataGuideFour);
    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('¿Estás seguro de guardar los datos?', true, {variant: 'info'});
    }
}
</script>