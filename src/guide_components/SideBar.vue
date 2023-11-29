<template>
    
    <!-- drawer component -->
    <div v-bind:class="{ left: isLeft }" class="fixed invisible md:visible top-14 right-0 z-40 w-64 h-screen p-4 overflow-y-auto dark:bg-gray-800">
        <!-- Por hacer un boton que muestre el menu en caso de estar en pequeña pantalla -->
        <!-- <div class="text-center fixed">
            <button class="text-black visible md:invisible bg-white hover:bg-gray-600 hover:text-white hover:border-2 hover:border-main-default focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                <font-awesome-icon icon="fa-solid fa-ellipsis" />
            </button>
        </div> -->
        <div v-if="!isLeft" id="drawer-navigation" class="py-4 overflow-y-auto" tabindex="-1" aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Secciones</h5>
            <ul class="font-medium">
                <li v-for="(item, index) in options" :key="index">
                    <a :href="`#${item[title]}`" class="flex text-sm items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon :icon="['fas', 'caret-right']" />
                        <span class="ml-3 text">{{ item[title] }}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div v-else id="drawer-navigation" class="py-4 overflow-y-auto" tabindex="-1" aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">{{ titleBar }}</h5>
            <ul class="font-medium">
                <li v-for="(item, index) in navigation" :key="index">
                    <RouterLink :to="item.link" class="flex text-sm items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <font-awesome-icon :icon="['fas', 'caret-right']" />
                        <span class="ml-3 text">{{ item[title] }}</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    options: {
        default: [],
        type: Array
    },
    navigation: {
        default: [],
        type: Array
    },
    title: {
        default: 'title',
        type: String
    },
    titleBar: {
        default: '',
        type: String
    },
    navigation: {
        default: [],
        type: Array
    },
    isLeft: {
        default: false,
        type: Boolean
    }
})
</script>

<style scoped>
.text {
    text-transform: lowercase;
}

.left {
    left: 0px;
}

.router-link-active{
    color: var(--light-color);
}
</style>