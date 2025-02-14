<template>
    <GuestLayout>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Register
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Name</label>
                        <div class="mt-2">
                            <input type="text" v-model="formData.name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            <span class="mt-2 text-sm text-red-500" v-if="errors.name.length > 0">
                                {{ errors.name[0] }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input type="text" v-model="formData.email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            <span class="mt-2 text-sm text-red-500" v-if="errors.email.length > 0">
                                {{ errors.email[0] }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="mt-2">
                            <input type="password" v-model="formData.password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            <span class="mt-2 text-sm text-red-500" v-if="errors.password.length > 0">
                                {{ errors.password[0] }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import GuestLayout from '../layouts/GuestLayout.vue';
import useAuthStore from '../stores/auth';
import { storeToRefs } from 'pinia';

const { authenticate, resetError } = useAuthStore();
const { errors } = storeToRefs(useAuthStore());

const formData = reactive({
    name: '',
    email: '',
    password: ''
});

const handleSubmit = async () => {
    resetError();

    await authenticate('api/register', formData)
}

</script>

<style scoped>

</style>
