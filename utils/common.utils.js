export const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getSession = () => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const userId = localStorage.getItem("userId")
    if (token && role) {
        if (role === 'admin') {
            return {
                isAdmin: true,
                isLoggedIn: true,
                token,
                role,
                userId
            }
        }
        else {
            return {
                isAdmin: false,
                isLoggedIn: true,
                token,
                role,
                userId
            }
        }
    }
    return {
        isAdmin: false,
        isLoggedIn: false,
        token,
        role,
        userId
    }
}

export const logout = () => {
    localStorage.clear()
    return true
}