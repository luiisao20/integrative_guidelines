<template>
    <SideBar
        :options="content"
    />
    <ModalAlert 
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1'"
    />
    <form class="py-10" :style="{ opacity: opacity }">
        <h1 :id="content[0].title" class="text-2xl font-bold text-center">EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO</h1>
        <TableObjectives
            :content="content[0].options"
            :data="dataGuideEight.tableOne"
        />
        <h1 class="text-2xl mb-4 font-bold text-center">TÉCNICAS EMPLEADAS Y GRADO DE EFICACIA</h1>
        <div v-for="item in dataTechniques" :id="item.title" >
            <RadioBox 
                :techniques="true"
                :title-table="item.title"
                :content="item.technqiques"
                :data="dataGuideEight.technqiques[item.title]"
            />
        </div>
        <h1 :id="content[4].title" class="mt-10 text-2xl font-bold text-center">Interrogantes al finalizar el proceso</h1>
        <TableInterrogations
            :content="content[4].options"
            :data="dataGuideEight.interrogations"
        />
        <div class="flex justify-end">
            <ButtonVue class="mt-10 p-2" type="submit" variant="info" @click.prevent="sendData">
                Enviar
            </ButtonVue>
        </div>
    </form>
</template>

<script setup>
import TableObjectives from '../guide_components/TableObjectives.vue'
import { reactive, ref } from 'vue';
import ButtonVue from '../general_components/ButtonVue.vue';
import TableInterrogations from '../guide_components/TableInterrogations.vue';
import RadioBox from '../guide_components/RadioBox.vue';
import SideBar from '../guide_components/SideBar.vue';
import ModalAlert from '../general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';

const { opacity, modalAlert, showModalAlert } = useModal();
const content = [
    {
        title: 'EVALUACION FINAL DEL PROCESO PSICOTERAPÉUTICO',
        options: [
            {
                title: 'PROCESO',
                options: ['Asesoramiento', 'Psicoterapia']
            },
            {
                title: 'OBJETIVOS ESTABLECIDOS',
                options: ['Asesoramiento', 'Sintomáticos', 'De personalidad']
            },
            {
                title: 'CUMPLIMIENTO DE OBJETIVOS',
                options: ['Paciente', 'Familiares', 'Terapeuta']
            },
        ]
    },
    {
        title: 'Asesoramiento'
    },
    {
        title: 'Sintomáticas'
    },
    {
        title: 'De personalidad'
    },
    {
        title: 'Interrogantes al finalizar el proceso',
        options: [
            {
                subtitle: 'Finalización del proceso',
                options: []
            },
            {
                subtitle: 'Cumplimiento de expectativas',
                options: ['Paciente', 'Familiares', 'Instituciones', 'Otros', 'Terapeuta']
            },
            {
                subtitle: 'Tratamiento mixto',
                options: []
            },
            {
                subtitle: 'Derivación del paciente a otro profesional',
                options: []
            },
            {
                subtitle: 'Deserción del paciente',
                options: []
            },
        ]
    }
]
const dataTechniques = reactive([
    {
        title: 'Asesoramiento',
        technqiques: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.'
        ]
    },
    {
        title: 'Sintomáticas',
        technqiques: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.'
        ]
    },
    {
        title: 'De personalidad',
        technqiques: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit earum soluta aliquam, reprehenderit esse sequi adipisci enim commodi. Alias maiores distinctio inventore aliquid et tempore, eos ratione minus eius itaque.'
        ]
    }
])
const dataGuideEight = reactive({
    tableOne: {
        'PROCESO': '',
        'OBJETIVOS ESTABLECIDOS': [],
        'Paciente': {
            rate: '',
            observations: ''
        }, 
        'Familiares': {
            rate: '',
            observations: ''
        }, 
        'Terapeuta': {
            rate: '',
            observations: ''
        }
    },
    interrogations: {
        'Finalización del proceso': {
            option: '',
            why: ''
        },
        'Paciente': {
            option: '',
            why: ''
        },
        'Familiares': {
            option: '',
            why: ''
        },
        'Instituciones': {
            option: '',
            why: ''
        },
        'Otros': {
            option: '',
            why: ''
        },
        'Terapeuta': {
            option: '',
            why: ''
        },
        'Tratamiento mixto': {
            option: '',
            why: ''
        },
        'Derivación del paciente a otro profesional': {
            option: '',
            why: ''
        },
        'Deserción del paciente': {
            option: '',
        }
    },
    technqiques: {
        'Asesoramiento': {},
        'Sintomáticas': {},
        'De personalidad': {}
    },
})
const isEmpty = ref(false);
const modalMessage = ref('');

function checkValues(){
    const keysExcluded = ['PROCESO', 'OBJETIVOS ESTABLECIDOS'];
    
    if (dataGuideEight.tableOne.PROCESO === '' || dataGuideEight.tableOne['OBJETIVOS ESTABLECIDOS'].length === 0){
        isEmpty.value = true;
        modalMessage.value = 'El "Proceso" o los "Objetivos establecidos" están vacíos';
        return
    }

    let count = 0;
    for (const key in dataGuideEight.tableOne){
        if (!keysExcluded.some(value => value === key)){
            if (dataGuideEight.tableOne[key].rate.toString().trim() === '' && dataGuideEight.tableOne[key].observations.toString().trim() === ''){
                count++
            }

            if (count === 3){
                isEmpty.value = true;
                modalMessage.value = 'Tienes que llenar al menos un cumplimiento de objetivos';
                return
            }
        }
    }

    for (let i = 0; i < dataTechniques.length; i++) {
        const element = dataTechniques[i];
        if (element !== Object.keys(dataGuideEight.technqiques[element.title]).length){
            isEmpty.value = true;
            modalMessage.value = 'Por cada técnica debes elegir una opción';
            return
        }
        
    }

    for (const key in dataGuideEight.interrogations){
        for (const subkey in dataGuideEight.interrogations[key]){
            if(dataGuideEight.interrogations[key][subkey].toString().trim() === ''){
                isEmpty.value = true;
                modalMessage.value = `El campo "${key}" de las Interrogantes al finalizar el proceso tiene que ser llenado`;
                return
            }
        }
    }

}

function sendData(){
    isEmpty.value = false;
    modalMessage.value = '';
    checkValues();

    if (isEmpty.value) {
        showModalAlert(modalMessage.value, false, {variant: 'danger'});
    } else {
        showModalAlert('Eureka', true);
    }
}
</script>