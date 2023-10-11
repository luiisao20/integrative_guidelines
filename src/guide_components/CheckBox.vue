<template>
    <h3 class="mb-4 text-center font-semibold text-gray-900 dark:text-white">
        {{ item.title }}
    </h3>
    <ul class="flex flex-col items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li v-for="(option, index) in item.options" :key="index" class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
                <input @change="updateOptionsSelected(option, $event.target.checked)"
                    :id="`horizontal-list-checkbox-${item.title}${index}`" :type="typeInput" 
                    :value="`${option}`" name="list-checkbox" class="w-4 h-4 text-main-default bg-gray-100 border-gray-300 focus:ring-main-default dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label :for="`horizontal-list-checkbox-${item.title}${index}`" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {{ option }}
                </label>
            </div>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    item: {
        required: true,
        type: Object
    },
    optionsSelected: {
        type: Array
    },
    optionSelected: {
        type: Object
    },
    typeInput: {
        default: 'checkbox',
        type: String
    }
})

function updateOptionsSelected(option, isChecked) {
    if(props.typeInput === 'checkbox'){
        // Use this method to update the optionsSelected array based on checkbox changes
        if (isChecked) {
        // Checkbox is checked, add the option to the array
            props.optionsSelected.push(option);
        } else {
        // Checkbox is unchecked, remove the option from the array
            const index = props.optionsSelected.indexOf(option);
            if (index !== -1) {
                props.optionsSelected.splice(index, 1);
            }
        }
    } else {
        props.optionSelected.selected = option;
    }
}
</script>