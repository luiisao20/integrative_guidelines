<template>
    <button
        class="text-white flex flex-row justify-center items-center rounded-xl"
        :style="{ backgroundColor }"
        :class="{ circular: applyCircleClass}"
        v-bind="$attrs"
        :disabled="isDisabled"
    >
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue';
import { useBackgroundColor, backgroundColorProps } from '../composables/backgroundColor.js';

const props = defineProps({
    circle: {
        default: false,
        type: Boolean
    },
    isDisabled: {
        default: false,
        type: Boolean
    },
    ...backgroundColorProps,
});

const backgroundColor = useBackgroundColor(props);

const applyCircleClass = computed(() => {
    return props.circle;
})
</script>

<style scoped>
.circular {
    border-radius: 50%;
}
</style>