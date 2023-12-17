<template>
    <ModalAlert
        v-bind="modalAlert"
        @close-mod="modalAlert.showModal = false; opacity = '1';
                    if (exit) router.push(`/${id}/psychodiagnosis`);"
        @send-data="sendData"
        @go-route="router.push(`/${id}/psychodiagnosis`)"
        :is-loading="isLoading.sending"
    />
    <div v-if="isLoading.data" class="flex justify-center my-20">
        <Spinner class="text-4xl" />
    </div>
    <div v-else :style="{ opacity: opacity }">
        <h1 class="text-center mt-5 font-extrabold text-3xl">{{ data.Consulta }}</h1>
        <div class="flex justify-between">
            <h1 class="pt-5"><span class="font-bold">Paciente:</span> {{ dataCopy.Apellidos }} {{ dataCopy.Nombres }}</h1>
            <h1 class="pt-5"><span class="font-bold">Edad:</span> {{ edad }} años {{ meses }} meses</h1>
        </div>
        <form action="" class="my-10" @submit.prevent="confirmData">
            <div v-for="(item, index) in content.slice(0, 3)" :key="index">
                <div class="relative z-0 w-full my-6 group">
                    <textarea v-model="data[item]" rows="4" :name="`floating_${item}`" :id="`floating_${item}`"
                        class="block py-2.5 px-0 w-full leading-relaxed text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" "  ></textarea>
                    <label :for="`floating_${item}`"
                        class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {{ item }}<PopOver v-if="item === 'Antecedentes Patológicos Personales (Prenatales, Natales y Postnatales)'" text-info="Este campo no es obligatorio" variant="info" /></label>
                </div>
            </div>
            <div>
                <h1 class="font-bold">
                    <span>Hábitos</span>
                    <PopOver text-info="Este campo no es obligatorio" variant="info" />
                </h1>
                <div class="md:grid grid-cols-3 justify-between px-10 py-4 gap-x-14">
                    <div v-for="(item, index) in habits" :key="index" class="flex items-center justify-between">
                        <label for="">{{ item }}</label>
                        <input @change="updateSelections(item, $event.target.checked)" type="checkbox" :id="`radio-${item}`" :value="item" :name="`radio-${item}`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default">
                    </div>
                </div>
                <TransitionGroup tag="div">
                    <div v-for="(item, index) in data.Hábitos.selected" :key="index" class="md:px-20">
                        <div class="relative z-0 w-full my-6 group">
                            <textarea v-model="data.Hábitos.text[item]" rows="2" :name="`floating_${item}`" :id="`floating_${item}`"
                                class="block py-2.5 px-0 w-full leading-relaxed text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                                placeholder=" "  ></textarea>
                            <label :for="`floating_${item}`"
                                class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {{ item }}</label>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
            <div v-for="(item, index) in content.slice(3, 6)" :key="index">
                <div class="relative z-0 w-full my-6 group">
                    <textarea v-model="data[item]" rows="4" :name="`floating_${item}`" :id="`floating_${item}`"
                        class="block py-2.5 px-0 w-full leading-relaxed text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                        placeholder=" "  ></textarea>
                    <label :for="`floating_${item}`"
                        class="peer-focus:font-medium capitalize absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {{ item }}
                        <PopOver v-if="item === 'Antecedentes Patológicos Familiares'" text-info="Este campo no es obligatorio" variant="info" />
                    </label>
                </div>
            </div>
    
            <div class="my-8">
                <ListAddDeleteTrans 
                    :array="data['Evaluación Psicométrica']"
                    title="Evaluación Psicométrica"
                    @updateDescr="updateDescr"
                    @updateFile="updateFile"
                />
            </div>
            <div class="my-8">
                <ListAddDeleteTrans 
                    :array="data.Diagnósticos"
                    title="Diagnósticos"
                    :show-file="false"
                    @updateDescr="updateDescrDia"
                    @updateCie="updateCie"
                    @updateOpt="updateOpt"
                />
            </div>
    
            <div class="my-10">
                <div class="flex justify-center gap-10">
                    <h1 class="font-bold text-center">Tratamiento</h1>            
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" @input="isChecked.treatment = ! isChecked.treatment; 
                                                        data.Tratamiento.selected = isChecked.treatment;
                                                        if(!data.Tratamiento.selected) {data.Tratamiento.content = null};" :checked="isChecked.treatment" class="sr-only peer">
                        <div class="w-11 h-6 bg-white border border-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <Transition>
                    <div v-if="isChecked.treatment && processes.length > 0" class="w-3/4 mx-auto my-8">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona un proceso de FIPS</label>
                        <select v-model="data.Tratamiento.content" id="countries" class="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-light focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Selecciona un proceso</option>
                            <option v-for="(process, index) in processes" :key="index" :value="process.id">{{ process.data().processName }}</option>
                        </select>
                        <a v-if="data.Tratamiento.content !== 'Selecciona un proceso'" class="pl-10 hover:underline hover:underline-offset-2 cursor-pointer" @click="goRoute">Ir al proceso</a>
                    </div>
                    <div v-else-if="isChecked.treatment && processes.length === 0">
                        <div class="flex px-10 py-4 items-center justify-between">
                            <h2>No existen proceso creados, ¿Deseas crear un nuevo proceso?</h2>
                            <button class="p-2 bg-light rounded-xl text-white" type="button" @click="createProcess = ! createProcess">Crear</button>
                        </div>
                        <div v-if="createProcess" class="relative z-0 w-full mb-6 group flex gap-10 items-center">
                            <input v-model="processName" type="text" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                            <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Escribe un nombre para el nuevo proceso
                            </label>
                            <button type="button" @click="createNewProcess" :disabled="isLoading.process" class="p-2 bg-light rounded-xl text-white">
                                <span v-if="isLoading.process"><Spinner /> Cargando </span>
                                <span v-else>Crear un nuevo proceso</span>
                            </button>
                        </div>
                        <a v-if="data.Tratamiento.content !== 'Selecciona un proceso'" class="pl-10 hover:underline hover:underline-offset-2 cursor-pointer" @click="goRoute">Ir al proceso</a>
                    </div>
                </Transition>
            </div>

            <div class="my-10">
                <div class="flex justify-center gap-10">
                    <h1 class="font-bold text-center">Emisión de Informe Psicológico</h1>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" @input="isChecked.disc = ! isChecked.disc; 
                                                        data['Emisión de Informe Psicológico'].selected = isChecked.disc; 
                                                        if (!data['Emisión de Informe Psicológico'].selected) {data['Emisión de Informe Psicológico'].content = null};" 
                            :checked="isChecked.disc" class="sr-only peer">
                        <div class="w-11 h-6 bg-white border border-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <Transition>
                    <div v-if="isChecked.disc">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Subir archivo</label>
                        <input accept=".pdf,.docx,.doc" @change="data['Emisión de Informe Psicológico'].content = $event.target.files[0]"
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            aria-describedby="file_input_help" id="file_input" type="file">
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Archivos tipo PDF, WORD</p>
                    </div>
                </Transition>
            </div>
    
            <button type="submit" class="p-2 bg-light text-white rounded-xl">Enviar</button>
        </form>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { doc, getDoc, where, getDocs, query, collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import ListAddDeleteTrans from '@/guide_components/ListAddDeleteTrans.vue';
import { formatDate } from '@/composables/formatDate';
import Spinner from '../../general_components/Spinner.vue';
import ModalAlert from '@/general_components/ModalAlert.vue';
import { useModal } from '@/composables/modal';
import { router } from '@/routes';
import { ref as refStrg, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../main';
import PopOver from '@/general_components/PopOver.vue';

const isChecked = reactive({
    treatment: false, disc: false
});
const isLoading = reactive({
    data: false, process: false, sending: false
})
const createProcess = ref(false);
const exit = ref(false);
const modal = reactive({
    isEmpty: false, message: '',
})
const props = defineProps(['id']);
const dataCopy = ref({});
const processes = ref([]);
const processName = ref('');
const edad = ref('');
const meses = ref('');
const habits = ['Alcohol', 'Drogas', 'Tabaco', 'Alimentación', 'Sueño', 'Otros'];
const content = [
    'Motivos de consulta', 'Enfermedad actual', 'Antecedentes Patológicos Personales (Prenatales, Natales y Postnatales)',
    'Antecedentes Patológicos Familiares', 'Evaluación de Funciones Básicas', 'Evaluación Clínica',
]
const data = reactive({
    'Consulta': '',
    'Motivos de consulta': '',
    'Enfermedad actual': '',
    'Antecedentes Patológicos Personales (Prenatales, Natales y Postnatales)': '',
    'Antecedentes Patológicos Familiares': '',
    'Hábitos': {
        selected: [],
        text: {}
    },
    'Antecedentes Patológicos Familiares': '',
    'Evaluación de Funciones Básicas': '',
    'Evaluación Clínica': '',
    'Evaluación Psicométrica': [],
    'Diagnósticos': [],
    'Tratamiento': {
        selected: isChecked.treatment,
        content: 'Selecciona un proceso'
    },
    'Emisión de Informe Psicológico': {
        selected: isChecked.disc,
        content: null
    }
})
const { opacity, modalAlert, showModalAlert } = useModal();

async function sendData(){

    isLoading.sending = true;

    showModalAlert('¡Esto puede tardar unos minutos!', true, { variant: 'info' });

    try {        
        for (const item of data['Evaluación Psicométrica']) {
            const evaluationRef = refStrg(storage, `${props.id}/${data.Consulta}/evaluations/${item.file.name}`);
            await uploadBytes(evaluationRef, item.file);
            const resUrl = await getDownloadURL(evaluationRef);
            item.file = resUrl;
        }
    
        const reportRef = refStrg(storage, `${props.id}/${data.Consulta}/evaluations/${data['Emisión de Informe Psicológico'].content.name}`);
        await uploadBytes(reportRef, data['Emisión de Informe Psicológico'].content);
        const resUrl = await getDownloadURL(reportRef);
        data['Emisión de Informe Psicológico'].content = resUrl;
    
        const diagnosisRef = doc(collection(db, 'psychodiagnosis'));
        await setDoc(diagnosisRef, {
            data: data,
            patient: props.id,
            createdAt: formatDate(new Date())
        })
        exit.value = true;
        showModalAlert('¡Los datos se han guardado exitosamente!', false, { variant: 'success', showRoute: true });
    } catch (error) {
        showModalAlert(error.message, false, { variant: 'danger' });
    }

    isLoading.sending = false;
}

function checkValues() {
    const keysExcluded = ['Antecedentes Patológicos Personales (Prenatales, Natales y Postnatales)', 'Antecedentes Patológicos Familiares'];
    for(const item of content){
        if(!keysExcluded.some(value => value === item)) {
            if(data[item].toString().trim() === ''){
                modal.isEmpty = true;
                modal.message = `El campo ${item} se encuentra vacío.`
                return
            }
        }
    }

    for(const item in data.Hábitos.text){
        if(data.Hábitos.text[item].toString().trim() === ''){
            modal.isEmpty = true;
            modal.message = `En el apartado de Hábitos, el campo ${item} se encuentra vacío`;
            return
        }
    }

    for(const item of data['Evaluación Psicométrica']) {
        if(!item.file || item.description.toString().trim() === '') {
            modal.isEmpty = true;
            modal.message = 'Existe un apartado en la Evaluación Psicométrica que se encuentra erróneo'
            return
        }
    }

    if(data.Diagnósticos.length === 0){
        modal.isEmpty = true;
        modal.message = 'Los diagnósticos no pueden quedar vacíos'
        return
    } else {
        for (const item of data.Diagnósticos){
            for(const key in item){
                if(item[key].toString().trim() === ''){
                    modal.isEmpty = true;
                    modal.message = 'Revisa los diagnósticos, hay un apartado vacío';
                    return
                }
            }
        }
    }

    const keysTreat = ['Tratamiento', 'Emisión de Informe Psicológico'];

    for(const key of keysTreat) {
        if(data[key].selected && (!data[key].content || data[key].content === 'Selecciona un proceso')){
            modal.isEmpty = true;
            modal.message = `En el campo "${key}" existe un error`;
            return
        }
    }

}

function goRoute() {
    const routeData = router.resolve(`/${props.id}/process/${data.Tratamiento.content}`);
    window.open(routeData.href, '_blank');
}

function confirmData() {
    modal.isEmpty = false;
    modal.message = '';
    checkValues();

    if(modal.isEmpty) showModalAlert(modal.message, false, { variant: 'danger' });
    else showModalAlert('¿Estás seguro de enviar los datos?', true);
}

async function createNewProcess() {
    isLoading.process = true;
    if (processName.value.toString().trim() === ''){
        showModalAlert('¡El nombre del proceso no puede estar vacío!', false, { variant: 'danger' });
    } else {
        const processRef = await addDoc(collection(db, 'processes'), {
            date: formatDate(new Date()),
            processName: processName.value,
            patient: props.id
        });
        data.Tratamiento.content = processRef.id;
        showModalAlert('¡Proceso creado con éxito!', false, { variant: 'success' });
    }
    isLoading.process = false;
}

function updateSelections(option, isChecked) {
    if (isChecked) {
        data.Hábitos.selected.push(option);
        data.Hábitos.text[option] = ''
    } else {
        const index = data.Hábitos.selected.indexOf(option);
        if (index !== -1) data.Hábitos.selected.splice(index, 1);
        delete data.Hábitos.text[option];
    }
}

onBeforeMount(async() => {

    isLoading.data = true;
    const patientRef = doc(db, 'patients', `${props.id}`);
    const docSnap = await getDoc(patientRef);
    dataCopy.value = { ...docSnap.data().dataPatient };

    const q = query(collection(db, 'processes'), where('patient', '==', `${props.id}`));
    const querySnapshot = await getDocs(q);
    processes.value = [ ...querySnapshot.docs ];

    const q2 = query(collection(db, 'psychodiagnosis'), where('patient', '==', `${props.id}`));
    const querySnapshot2 = await getDocs(q2);
    data.Consulta = `Consulta ${querySnapshot2.docs.length + 1}`

    edad.value = getAge(dataCopy.value['Fecha de nacimiento'])
    isLoading.data = false;
})

function getAge(birthday) {
    let hoy = new Date()
    let fechaNacimiento = new Date(birthday)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    meses.value = diferenciaMeses;
    if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
        edad--;
        meses.value = 0;
    }
    return edad
}

function updateCie(value, index) {
    data.Diagnósticos[index].cie = value;
}

function updateOpt(value, index) {
    data.Diagnósticos[index].option = value;
}

function updateDescrDia(value, index) {
    data.Diagnósticos[index].description = value;
}

function updateDescr(value, index) {
    data['Evaluación Psicométrica'][index].description = value;
}

function updateFile(value, index) {
    data['Evaluación Psicométrica'][index].file = value;
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}
</style>