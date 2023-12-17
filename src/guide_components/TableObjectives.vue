<template>
    <table class="text-sm w-full my-10 text-black rounded-xl dark:text-black-400">
        <tbody>
            <tr class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-black-400">
                <th scope="col" colspan="6" class="px-6 py-3">
                    {{ content[0].title }}
                    <PopOver variant="info" text-info="Toda la tabla tiene que ser llenada" />
                </th>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td v-for="(item, index) in content[0].options" :key="index" colspan="3" class="px-2 py-4 text-center text-black">
                    <div class="flex flex-row justify-center gap-10">
                        <div class="flex flex-row gap-4">
                            {{ item }}
                        </div>
                        <div class="flex flex-row gap-4">
                            <input v-model="data[content[0].title]"
                            id="process-radio" type="radio" :value="item" name="process-radio" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-black-400">
                <th scope="col" colspan="6" class="px-6 py-3">
                    {{ content[1].title }}
                    <PopOver variant="info" text-info="Puedes escojer una o varias opciones" />
                </th>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td v-for="(item, index) in content[1].options" :key="index" colspan="2" class="px-2 py-4 text-center text-black">
                    <div class="flex flex-row justify-center gap-10">
                        <div class="flex flex-row gap-4">
                            {{ item }}
                        </div>
                        <div class="flex flex-row gap-4">
                            <input @change="updateInfo(item, $event.target.checked)"
                            id="objectives-checkbox" type="checkbox" :value="item" name="objectives-checkbox" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-black-400">
                <th scope="col" colspan="6" class="px-6 py-3">
                    {{ content[2].title }}
                </th>
            </tr>
            <tr v-for="(item, index) in content[2].options" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colspan="1" class="py-4 px-6 text-center text-black">
                    {{ item }}
                </td>
                <td class="px-6 py-4 text-center text-black">
                    <div class="flex items-center justify-center">
                        <select v-model="data[item].rate"
                            id="countries" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-main-default focus:border-main-default block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Escoge</option>
                            <option v-for="(item, subindex) in selections" :key="subindex" :value="item">{{ item }}</option>
                        </select>
                    </div>
                </td>
                <td colspan="4" class="px-6 py-4 text-center text-black">
                    <div class="relative z-0 w-full mb-2 group">
                        <textarea v-model="data[item].observations" rows="2"
                            name="floating-observations" id="floating-observations"
                            class="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
                            placeholder=" "></textarea>
                        <label for="floating-observations"
                            class="peer-focus:font-medium absolute text-sm text-black dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-main-default peer-focus:dark:text-main-default peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Observaciones</label>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import PopOver from '@/general_components/PopOver.vue';

const props = defineProps({
    content: {
        required: true,
        type: Object
    },
    data: {
        required: true,
        type: Object
    }
})

const selections = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function updateInfo(item, value){
    if (value) {
    // Checkbox is checked, add the option to the array
        props.data['OBJETIVOS ESTABLECIDOS'].push(item);
    } else {
    // Checkbox is unchecked, remove the option from the array
        const index = props.data['OBJETIVOS ESTABLECIDOS'].indexOf(item);
        if (index !== -1) {
            props.data['OBJETIVOS ESTABLECIDOS'].splice(index, 1);
        }
    }
}

</script>