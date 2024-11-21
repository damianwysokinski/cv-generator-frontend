import { defineStore } from 'pinia';
import { useCookie } from '#app';
import { useToastStore } from "~/stores/toast.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isLoggedIn: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const result = await GqlLogin(email, password);

                const accessTokenCookie = useCookie('access_token');
                const refreshTokenCookie = useCookie('refresh_token');

                accessTokenCookie.value = result?.login?.accessToken;
                refreshTokenCookie.value = result?.login?.refreshToken;

                await this.checkAuth();
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        async register(userData) {
            try {
                await GqlRegister(userData);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        },
        async checkAuth() {
            try {
                const { user } = await GqlGetUserData();

                if (user) {
                    this.user = user;
                    this.isLoggedIn = true;
                } else {
                    this.user = null;
                    this.isLoggedIn = false;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updateUser(id, formData) {
            const toastStore = useToastStore();

            try {
                const { updateUser } = await GqlUpdateUser({
                    id,
                    ...formData,
                });

                this.user = updateUser;
                toastStore.addToast('Profile saved successfully', 'success');
            } catch (error) {
                console.error(error);
            }
        },
        async removeUser(userId) {
            try {
                await GqlRemoveUser({ id: userId });

                this.logout();
            } catch (error) {
                console.error(error);
            }
        },
        logout() {
            this.user = null;
            this.isLoggedIn = false;

            const accessTokenCookie = useCookie('access_token');
            const refreshTokenCookie = useCookie('refresh_token');

            accessTokenCookie.value = null;
            refreshTokenCookie.value = null;
        },
    },
});
