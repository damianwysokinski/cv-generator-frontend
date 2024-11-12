export default defineNuxtPlugin((nuxtApp) => {
    // access cookie for auth
    const cookie = useCookie('access_token');

    nuxtApp.hook('gql:auth:init', ({client, token}) => {
        token.value = cookie.value ? `Bearer ${cookie.value}` : '';
    })
})