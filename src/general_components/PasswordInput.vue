<template>
    <div class="flex">
        <input :value="password" @input="$emit('update:password', $event.target.value)" :type="type" :name="name" :id="name" placeholder="••••••••" class="bg-gray-50 border-l border-t border-b border-gray-300 text-gray-900 sm:text-sm rounded-l-lg block w-full p-2.5" required="">
        <button
            @click.prevent="if(type === 'password') type = 'text'; else type = 'password'"
            pattern="^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[= >?:;'{}]).{8,}$"
            class="text-black px-2 rounded-r-xl bg-gray-50 border-r border-t border-b border-gray-300">
            <font-awesome-icon v-if="type === 'password'" icon="fa-solid fa-eye" />
            <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    name: {
        default: 'password',
        type: String
    },
    password: {
        required: true,
        type: String
    }
})
const emit = defineEmits(['update:password']);

const type = ref('password');
</script>