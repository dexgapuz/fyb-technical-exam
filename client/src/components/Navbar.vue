<template>
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ user.name }}</h1>
        <button @click="logout" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Logout
        </button>
      </div>
    </header>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useAuthStore from '../stores/auth';

const { user } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
</script>

<style scoped>

</style>
