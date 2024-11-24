export default defineNuxtPlugin((nuxtApp) => {
    // access cookie for auth
    const accessTokenCookie = useCookie('access_token');

    nuxtApp.hook('gql:auth:init', ({client, token}) => {
        token.value = accessTokenCookie.value ? `Bearer ${accessTokenCookie.value}` : '';
    })
})