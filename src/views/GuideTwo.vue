<template>
    <form class="py-10">
        <h1 class="text-2xl font-bold text-center">ANÁLISIS DE LA PRIMER ENTREVISTA</h1>
        <CheckBox
            type-input="radio"
            :item="content[0]"
            v-model:option-selected="dataGuideTwo[`${content[0].title}`]"
        />
        <h2 class="mt-10 text-center font-semibold text-gray-900 dark:text-white">INTERROGANTES AL FINALIZAR LA PRIMERA ENTREVISTA</h2>
        <TableForm
            v-model:data="dataGuideTwo.tableOne"
            @update-info="showData"
            :content="content.slice(1, 17)"
        />
        <h2 class="mt-10 text-center font-semibold text-gray-900 dark:text-white">CARACTERÍSTICAS DEL PACIENTE</h2>
        <RadioBox
            v-model:data="dataGuideTwo.tableTwo"
            :content="content[17].options"
            @update-info="showData"
        />
        <Button class="p-2 mb-10" variant="secondary" type="button" @click="console.log(dataGuideTwo.table)">
            Guardar información
        </Button>
    </form>
</template>

<script setup>
import { reactive } from 'vue';
import CheckBox from '../components/CheckBox.vue';
import TableForm from '../components/TableForm.vue';
import RadioBox from '../components/RadioBox.vue';
import Button from '../components/Button.vue';

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
const dataGuideTwo = reactive({
    'Tipo de primera entrevista': {
        selected: ''
    },
    tableOne: {},
    tableTwo: {
        'Motivación a recibir ayuda': '',
        'Capacidad cognitiva': '',
        'Grado de integración de la personalidad': '',
        'Capacidad de respuesta emocional': '',
        'Flexibilidad': '',
        'Locus de control interno': ''
    }
})

function showData(){
    console.log(dataGuideTwo);
}
</script>