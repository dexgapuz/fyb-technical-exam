<template>
    <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
                <input type="text" v-model="name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <span class="mt-2 text-sm text-red-500" v-if="errors.name.length > 0">
                    {{ errors.name[0] }}
                </span>
            </div>
        </div>
        <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Description</label>
            <div class="mt-2">
                <input type="text" v-model="description" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <span class="mt-2 text-sm text-red-500" v-if="errors.description.length > 0">
                    {{ errors.description[0] }}
                </span>
            </div>
        </div>
        <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Submit
            </button>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axiosClient from '../http/axios';
import axios from 'axios';

const emit = defineEmits(['submit']);
const name = ref('');
const description = ref('');
const id = ref('');
const errors = reactive({
    name: [],
    description: []
});

defineExpose({name, description, id});

const handleSubmit = () => {
    axiosClient.post('/api/products', {name: name.value, description: description.value})
        .then(() => {
            name.value = '';
            description.value = '';
            errors.name = [];
            errors.description = [];

            emit('submit');
        })
        .catch(err =>  {
            if (axios.isAxiosError(err)) {
                errors.name = err.response?.data.errors.name || [];
                errors.description = err.response?.data.errors.description || [];
            }
        });

}
</script>

<style scoped>

</style>
