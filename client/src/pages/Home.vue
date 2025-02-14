<template>
    <Navbar />
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button @click="openCreate = true" class="rounded-md mb-10 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add
        </button>
        <div class="flex flex-col items-center">
            <div class="w-full overflow-hidden rounded-lg border border-stone-200">
                <table class="w-full">
                    <thead class="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600">
                        <tr>
                            <th class="px-2.5 py-2 text-start font-medium">Name</th>
                            <th class="px-2.5 py-2 text-start font-medium">Description</th>
                            <th class="px-2.5 py-2 text-start font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody class="group text-sm text-stone-800">
                        <tr class="border-b border-stone-200 last:border-0" v-for="product in products">
                            <td class="p-3">{{ product.name }}</td>
                            <td class="p-3">{{ product.description }}</td>
                            <td class="p-3">
                                <a href="#" @click="openModalEdit(product.id)" class="font-sans antialiased text-sm text-current font-medium hover:text-primary">Edit</a> |
                                <a href="#" @click="deleteProduct(product.id)" class="font-sans antialiased text-sm text-current font-medium hover:text-primary">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </main>
    <TransitionRoot as="template" :show="openCreate">
        <Dialog class="relative z-10" @close="openCreate = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <CreateProduct @submit="created"/>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="openCreate = false" ref="cancelButtonRef">Close</button>
                </div>
                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="openEdit">
        <Dialog class="relative z-10" @close="openEdit = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <EditProduct ref="zxc"/>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="openEdit = false" ref="cancelButtonRef">Close</button>
                </div>
                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { onMounted, ref, useTemplateRef } from 'vue';
import Navbar from '../components/Navbar.vue';
import useAuthStore from '../stores/auth';
import CreateProduct from '../components/CreateProduct.vue';
import axiosClient from '../http/axios';
import type Product from '../interfaces/Product';
import EditProduct from '../components/EditProduct.vue';

const { getUser } = useAuthStore();
const openCreate = ref(false);
const openEdit = ref(false);
const products = ref<Product[]>([]);
const editForm = useTemplateRef('zxc');


onMounted(async () => {
    await getUser();
    await fetchProducts();
});

const created = async () => {
    openCreate.value = false;
    await fetchProducts();
}

const fetchProducts = async () => {
    try {
        const { data } = await axiosClient.get('api/products');
        products.value = data.data;
    } catch (error) {
        throw error;
    }
}

const openModalEdit = (id: string) => {
    console.log(id);
    console.log(editForm.value);
}

const deleteProduct = async (id: string) => {
    axiosClient.delete(`api/products/${id}`)
        .then(async () => await fetchProducts());
}

</script>

<style scoped>

</style>
