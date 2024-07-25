import { useCookies } from '@vueuse/integrations/useCookies'

const cookie = useCookies()

const Tokenkey = "admin-token"

export function getToken(){
    return cookie.get(Tokenkey)
}

export function setToken(){
    return cookie.set(Tokenkey)
}

export function removeToken(){
    return cookie.remove(Tokenkey)
}