import { useAuthStore } from "~/stores/auth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    await authStore.checkAuth();

    if (!authStore.isLoggedIn) {
        return navigateTo('/auth/login');
    }
});
