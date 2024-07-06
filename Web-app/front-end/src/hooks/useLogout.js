import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const logout = () => {
        localStorage.removeItem('user')

        dispatchEvent({type: 'LOGOUT'})
    }

    return {logout}
}