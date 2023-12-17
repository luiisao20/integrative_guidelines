<template>
    <h2 class="text-xl mt-10 mb-4 font-bold">Datos informativos</h2>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Lugar de atención']" type="text" name="floating_first_name" id="floating_first_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_first_name"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Lugar de atención</label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Unicódigo']" type="text" name="floating_last_name" id="floating_last_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_last_name"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Unicódigo</label>
        </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Nombres']" type="text" name="floating_first_name" id="floating_first_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_first_name"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nombres</label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Apellidos']" type="text" name="floating_last_name" id="floating_last_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_last_name"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Apellidos</label>
        </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Número de cédula']" type="text" name="floating_id" id="floating_id"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" " :maxlength="maxlength" />
            <label for="floating_id"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Número de cédula</label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Correo electrónico (opcional)']" type="email" name="floating_email" id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" " />
            <label for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Correo electrónico (opcional)</label>
        </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Lugar de nacimiento']" type="text" name="floating_birth_place" id="floating_birth_place"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_birth_place" id="hola"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Lugar de nacimiento</label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <DatePretty
                @update-date="updateBirthday"
            />
        </div>
    </div>
    <div class="grid md:grid-cols-3 md:gap-1">
        <div class="relative z-0 w-full mb-6 group" v-for="(item, index) in packs" :key="index">
            <input  v-model="dataUser[item]" type="text" :name="`floating_${index}`" :id="`floating_${index}`"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label :for="`floating_${index}`"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {{ item }}</label>
        </div>
    </div>
    <div class="flex md:flex-row gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <textarea  v-model="dataUser['Hermanos, género y edad de cada uno de ellos']" rows="4" name="floating_brothers" id="floating_brothers"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  ></textarea>
            <label for="floating_brothers"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Hermanos, género y edad de cada uno de ellos</label>
        </div>
        <div class="relative z-0 w-[80%] mb-6 group">
            <textarea  v-model="dataUser['Lugar que ocupa entre sus hermanos']" type="text" name="floating_place_between" id="floating_place_between" rows="4"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  ></textarea>
            <label for="floating_place_between"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Lugar que ocupa entre sus hermanos</label>
        </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Informante']" type="text" name="floating_companion" id="floating_companion"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_companion"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Informante</label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Parentesco']" type="text" name="floating_companion_parent" id="floating_companion_parent"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" "  />
            <label for="floating_companion_parent"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Parentesco</label>
        </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6 ">
        <div class="w-full">
            <label for="underline_select" class="sr-only" >Underline select</label>
            <select  v-model="dataUser['Tipo de atención']" id="underline_select" class="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300 text-black dark:text-gray-400 dark:border-gray-700 ">
                <option disabled>Tipo de atención </option>
                <option class="text-black">Ambulatorio</option>
                <option class="text-black">Hospitalizado</option>
                <option class="text-black">Consulta privada</option>
                <option value="other" class="text-black">Otros ¿Cuál?</option>
            </select>
            <PopOver variant="info" text-info="En caso de escoger 'Otros', deberás escribir el tipo de atención en el apartado 'Otro tipo de atención'" /> 
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input  v-model="dataUser['Otro tipo de atención']" :disabled="dataUser['Tipo de atención'] !== 'other'" type="text" name="floating_attentionType" id="floating_attentionType"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                placeholder=" " />
            <label for="floating_attentionType"
                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Otro tipo de atención</label>
        </div>
    </div>
    <div>
    </div>
</template>

<script setup>
import DatePretty from '../general_components/DatePretty.vue';
import PopOver from '../general_components/PopOver.vue';

const props = defineProps({
    dataUser: {
        required: true,
        type: Object
    },
    maxlength: {
        default: '10',
        type: String
    }
})
const packs = [
    'Estado Civil', 'Número de hijos', 'Religión',
    'Ciudad de residencia', 'Dirección', 'Celular',
    'Instrucción', 'Profesión', 'Ocupación',
    'Grupo étnico', 'Género', 'Grupo socio-económico',
    'Nombre del padre', 'Edad (padre)', 'Ocupación (padre)',
    'Nombre de la madre', 'Edad (madre)', 'Ocupación (madre)',
]

function updateBirthday(date){
    props.dataUser['Fecha de nacimiento'] = date;
}

</script>