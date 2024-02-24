<template>
    <div class="flex items-center justify-between">
        <img :src="sourceImg"
            class="w-[150px] h-[150px] mb-3 rounded-full shadow-lg" alt="Profile Pic"/>
        <h1 class="mb-4 text-3xl text-center mt-10 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-light">{{ data.data().lastName }} {{ data.data().name }}</span></h1>
    </div>
    <p class="text-lg font-normal text-black lg:text-xl dark:text-gray-400">
        En este espacio centralizado de perfil, los usuarios pueden personalizar su experiencia y gestionar aspectos clave de su cuenta.
    </p>
    <form @submit.prevent="saveDescription" class="my-10 flex flex-col gap-4">
        <label for="description" class="pl-8 text-lg font-normal text-black lg:text-xl dark:text-gray-400">
            Primer paso: Realiza una breve descripción de tu persona.
        </label>    
        <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-light focus:border-light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe tus pensamientos..."></textarea>
        <div class="flex justify-end">
            <button type="submit" :disabled="isLoading" class="px-4 py-2 bg-light hover:bg-main-default rounded-xl w-1/4 text-white">
                <span v-if="isLoading"><Spinner /> Cargando</span>
                <span v-else>Guardar</span>
            </button>
        </div>
    </form>
    <form @submit.prevent="saveProfilePic" class="my-10 flex flex-col gap-4">
        <label for="input_file" class="pl-8 text-lg font-normal text-black lg:text-xl dark:text-gray-400">
            Segundo paso: Sube una foto de perfil. (De tamaño máximo 5Mb)
        </label>
        <input 
            @change="applyFile" required
            accept=".jpg,.png,.jpeg"
            class="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
            id="file_input" type="file">
        <div class="flex justify-end">
            <button type="submit" :disabled="isLoading" class="px-4 py-2 bg-light hover:bg-main-default rounded-xl w-1/4 text-white">
                <span v-if="isLoading"><Spinner /> Cargando</span>
                <span v-else>Guardar</span>
            </button>
        </div>
    </form>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/main.js';
import Spinner from '../../general_components/Spinner.vue';
import { ref as refStrg, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../main';

const props = defineProps({
    data: { required: true, type: Object }
})
const description = ref('');
const sourceImg = ref('');
const isLoading = ref(false);
const pic = ref(null);

onBeforeMount(() => {
    description.value = props.data.data().description;
    if (!props.data.data().profilePic) sourceImg.value = 'https://firebasestorage.googleapis.com/v0/b/integrative-guidelines.appspot.com/o/profile.webp?alt=media&token=b12d3276-179c-4493-a950-8634cea37175';
    else sourceImg.value = props.data.data().profilePic;
})

function applyFile(event) {
    pic.value = event.target.files[0];
}

async function saveDescription() {
    isLoading.value = true;
    const userRef = doc(db, 'users', `${props.data.id}`);
    try {
        await updateDoc(userRef, {
            description: description.value
        });
        
    } catch (error) {
        console.log(error);
    }
    isLoading.value = false;
}

function saveProfilePic() {
    isLoading.value = true;
    const storageRef = refStrg(storage, `${props.data.id}/prfilepic/${pic.value.name}`);

    uploadBytes(storageRef, pic.value).then((snapshot) => {
        saveInDb()
    }).catch((error) => console.log(error.message)).finally(() => {
        isLoading.value = false;
    })
}

function saveInDb() {
    const path = `${props.data.id}/${pic.value.name}`;
    const userRef = doc(db, 'users', `${props.data.id}`);

    getDownloadURL(refStrg(storage, path)).then(async(url) => {
        sourceImg.value = url;
        try {
            await updateDoc(userRef, {
                profilePic: url
            })
        } catch (error) {
            console.log(error.message);
        }
    }).catch((error) => console.log(error.message))
}
</script>