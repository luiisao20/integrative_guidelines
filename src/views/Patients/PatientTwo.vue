<template>
    <section v-if="dataCopy.length > 0">

        <div class="flex justify-center gap-4 my-4 p-4">
            <h3 class="text-center font-semibold text-gray-900 dark:text-white">
                Tipo de primera entrevista:
            </h3>        
            <h3 class="text-center text-gray-900 dark:text-white">
                {{ dataCopy[0].dataGuideTwo['Tipo de primera entrevista'].selected }}
            </h3>
        </div>

        <div class="shadow-md shadow-light rounded-xl m-4">
            <table class="text-sm text-left text-gray-500 rounded-2xl dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr class="w-[80%]">
                        <th scope="col" class="px-6 py-3 w-[40%]">
                            
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Opción
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Observaciones
                        </th>
                    </tr>
                </thead>
                <tbody class="text-xs">
                    <tr v-for="(item, index) in content[1].options" :key="index"
                        class="w-1/2 dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4 text-black dark:text-white">
                            <h3 class="font-bold">{{ item.title }}</h3>
                            <p>{{ item.subtitle }}</p>
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ dataCopy[0].dataGuideTwo.tableOne[`${item.title}.${index}.option`] }}
                        </td>
                        <td class="px-6 py-4">
                            <p class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer">
                                {{ dataCopy[0].dataGuideTwo.tableOne[`${item.title}.${index}.observation`] }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="shadow-sm shadow-light w-[80%] mx-auto rounded-xl">
            <h3 class="text-center py-4 font-semibold text-gray-900 dark:text-white">
                CARACTERÍSTICAS DEL PACIENTE
            </h3> 
            <div class="p-4">
                <div v-for="(item, key) in dataCopy[0].dataGuideTwo.tableTwo" class="flex justify-between pl-10 gap-4 my-4 text-sm">
                    <p class="text-center font-semibold text-gray-900 dark:text-white">
                        {{ key }}:
                    </p>        
                    <p class="text-center text-gray-900 dark:text-white">
                        {{ item }}
                    </p>
                </div>
            </div>
        </div>
    </section>
    <div>
        <CreateGuide guide="two" :id="id" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
import CreateGuide from '../../general_components/CreateGuide.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Object
    },
    createdAt: {
        required: true,
        type: String
    }
})
const isLoading = ref(false);
const dataCopy = ref([]);
const content = [
    {
        title: 'Tipo de primera entrevista',
        options: [
            'Entrevista de psicodiagnóstico',
            'Entrevista de consulta',
            'Entrevista única',
            'Inicio de proceso terapéutico'
        ]
    },
    {
        title: 'INTERROGANTES AL FINALIZAR LA PRIMERA ENTREVISTA',
        options: [

            {
                title: 'RAPPORT',
                subtitle: '¿Sentí un clima de confianza mutua durante la entrevista?'
            },
            {
                title: 'PERMISIVIDAD',
                subtitle: '¿Logré que el paciente hablé con libertad sobre su problema o su trastorno?'
            },
            {
                title: 'APROXIMACIÓN DIAGNÓSTICA DEL PROBLEMA Y/O TRASTORNO',
                subtitle: '¿Tengo claridad en la aproximación diagnóstica del problema y/o trastorno?'
            },
            {
                title: 'APROXIMACIÓN DIAGNÓSTICA DE LA PERSONALIDAD',
                subtitle: '¿He logrado una aproximación diagnóstica de la personalidad?'
            },
            {
                title: 'POSIBILIDADES DE INTERVENCIÓN',
                subtitle: '¿He identificado las facilidades y dificultades de la intervención psicológica?'
            },
            {
                title: 'EMPATÍA',
                subtitle: '¿Percibí el relato desde su propia significación cognitiva y respuesta afectiva?'
            },
            {
                title: 'EMPATÍA',
                subtitle: '¿Logré que el demandante se sienta comprendido por su problema?'
            },
            {
                title: 'DESINHIBICIÓN EMOCIONAL',
                subtitle: '¿Se produjo desinhibición emocional en la primera entrevista?'
            },
            {
                title: 'DESINHIBICIÓN EMOCIONAL',
                subtitle: '¿La desinhibición emocional se presentó por la propia dinámica del relato?'
            },
            {
                title: 'DESINHIBICIÓN EMOCIONAL',
                subtitle: '¿Se requirió intervención del terapeuta para lograr la desinhibición emocional?'
            },
            {
                title: 'APOYO EMOCIONAL',
                subtitle: '¿Intervine con técnicas comunicacionales para apoyarle emocionalmente al paciente?'
            },
            {
                title: 'ESTRUCTURACIÓN DEL PROCESO',
                subtitle: '¿Terminó convencido sobre las posibilidades y objetivos de la psicoterapia?'
            },
            {
                title: 'ESTRUCTURACIÓN DEL PROCESO',
                subtitle: '¿Tiene confianza el paciente en mí como terapeuta y en la psicoterapia como forma de tratamiento?'
            },
            {
                title: 'RESISTENCIA AL PROCESO',
                subtitle: '¿Se identificaron componentes de resistencia?'
            },
            {
                title: 'TRANSFERENCIA',
                subtitle: '¿Se identificaron componentes de transferencia?'
            },
            {
                title: 'CONTRATRANSFERENCIA',
                subtitle: '¿Se identificaron componentes de contratransferencia?'
            },
        ]
    },
    {
        title: 'CARACTERÍSTICAS DEL PACIENTE',
        options: [
            'Motivación a recibir ayuda',
            'Capacidad cognitiva',
            'Grado de integración de la personalidad',
            'Capacidad de respuesta emocional',
            'Flexibilidad',
            'Locus de control interno'
        ]
    }
]

onBeforeMount(async() => {
    isLoading.value = true;
    const { data, error } = await useFetch(`guidetwo?patient=${props.id}`);

    dataCopy.value = [ ...data.value ];

    console.log(dataCopy.value[0]);

    isLoading.value = false;
})
</script>