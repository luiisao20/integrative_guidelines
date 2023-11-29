<template>
    <table class="text-sm w-full text-gray-500 rounded-xl dark:text-gray-400">
        <tbody>
            <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" colspan="2" class="px-6 py-3">
                </th>
                <th scope="col" colspan="2" class="px-2 py-3 text-center">
                    Privacidad
                </th>
                <th scope="col" colspan="2" class="px-2 py-3 text-center">
                    Tranquilidad
                </th>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colspan="2" class="px-6 py-4 text-black dark:text-white">
                    <h3 class="font-bold">Características del consultorio</h3>
                </td>
                <td colspan="2" class="px-2 py-4 text-center text-black">
                    <div class="flex flex-row justify-center gap-4">
                        <div class="flex flex-row gap-4">
                            <p>Sí</p>
                            <input  v-model="data.dataTable['Características del consultorio'].Privacidad"
                            id="consultory-privacy" type="radio" value="Sí" name="consultory-privacy" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                        <div class="flex flex-row gap-4">
                            <p>No</p>
                            <input  v-model="data.dataTable['Características del consultorio'].Privacidad"
                            id="consultory-privacy" type="radio" value="No" name="consultory-privacy" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                    </div>
                </td>
                <td colspan="2" class="px-2 py-4 text-center text-black">
                    <div class="flex flex-row justify-center gap-4">
                        <div class="flex flex-row gap-4">
                            <p>Sí</p>
                            <input  v-model="data.dataTable['Características del consultorio'].Tranquilidad"
                            id="consultory-quiet" type="radio" value="Sí" name="consultory-quiet" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                        <div class="flex flex-row gap-4">
                            <p>No</p>
                            <input  v-model="data.dataTable['Características del consultorio'].Tranquilidad"
                            id="consultory-quiet" type="radio" value="No" name="consultory-quiet" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th colspan="2" scope="col" class="px-6 py-3">
                </th>
                <th scope="col" colspan="2" class="px-2 py-3 text-center">
                    Sí <PopOver variant="info" textInfo="Si existen grabaciones de las sesiones, debes llenar el apartado de 'Tipo de grabación'"/>
                </th>
                <th scope="col" colspan="2" class="px-2 py-3 text-center">
                    No
                </th>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colspan="2" class="px-6 py-4 text-black dark:text-white">
                    <h3 class="font-bold">Grabación de las sesiones</h3>
                </td>
                <td colspan="2" class="px-2 py-4 text-center">
                    <input  v-model="data.dataTable['Grabación de las sesiones']"
                        id="recording-sessions" type="radio" value="Sí" name="recording-sessions" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
                <td colspan="2" class="px-2 py-4 text-center">
                    <input  v-model="data.dataTable['Grabación de las sesiones']"
                        @click="data.dataTable['Tipo de grabación'] = ''"
                        id="recording-sessions" type="radio" value="No" name="recording-sessions" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
            <tr>
                <td colspan="6" class="bg-white border-b px-4 py-4 dark:bg-gray-800 dark:border-gray-700 text-center">
                    <div class="grid md:grid-cols-2 md:gap-6 bg-white pt-4 px-4 rounded-xl">
                        <div class="relative z-0 w-full mb-2 group">
                            <input  v-model="data.dataTable['Tipo de grabación']" 
                                name="floating_record_type" id="floating_record_type"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                                placeholder=" " :disabled="data.dataTable['Grabación de las sesiones'] === 'No'" />
                            <label for="floating_record_type"
                                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Tipo de grabación</label>
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <input  v-model="data.dataTable['Efecto Tipo de grabación']" 
                                name="floating_efect_records" id="floating_efect_records"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                                placeholder=" "/>
                            <label for="floating_efect_records"
                                class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Efecto</label>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="col" colspan="6" class="text-xs font-bold py-4 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    Posición entre paciente y terapeura 
                    <PopOver variant="info" textInfo="Escoge un tipo de posición o puedes llenar el apartado 'Otro', además es obligatorio el campo 'Efecto'"/>
                </th>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td v-for="(item, index) in content.slice(0, 5)" :key="index" class="px-4 py-4 text-black dark:text-white">
                    <h3 class="font-bold text-center">{{ item }}</h3>
                </td>
                <td rowspan="2" class="py-4 px-2 w-[15%] text-black dark:text-white">
                    <div class="relative z-0 mb-2 w-full">
                        <input v-model="data.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].other"
                            name="floating-others" id="floating-others"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "  />
                        <label for="floating-others"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Otro</label>
                    </div>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td v-for="(item, index) in content.slice(0, 5)" :key="index" class="px-2 py-4 text-center">
                    <input @change="updateSelection(item, $event.target.checked)"
                        :id="`radio-pacient-therapist`" type="checkbox" :value="`${item}`" :name="`radio-pacient-therapist`" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td>
            </tr>
            <tr>
                <td colspan="6" class="bg-white border-b px-10 py-4 dark:bg-gray-800 dark:border-gray-700 text-center">
                    <div class="relative z-0 mb-2 w-full">
                        <textarea v-model="data.dataTable['Efecto POSICIÓN ENTRE PACIENTE Y TERAPEURA']"
                            name="floating_efects" id="floating_efects" rows="4"
                            class="block py-2.5 pl-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" " ></textarea>
                        <label for="floating_efects"
                            class="left-0 pl-10 peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Efecto</label>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import PopOver from '../general_components/PopOver.vue';

const props = defineProps({
    data: {
        required: true,
        type: Object
    }
})
const content = [
    'Vis a Vis', 'Diván', 'Choisse Lone', 'Diagonal', 'Sin Escritorio', 'Otro'
]

function updateSelection(option, isChecked) {
    if (isChecked) props.data.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].options.push(option);
    else {
        const index = props.data.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].options.indexOf(option);
        props.data.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].options.splice(index, 1);
    }

    console.log(props.data.dataTable['POSICIÓN ENTRE PACIENTE Y TERAPEURA'].options);
}
</script>