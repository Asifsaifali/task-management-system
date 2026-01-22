import api from "@/lib/axios";

export async function login(email: string, password: string){
    const response = await api.post('/auth/login', {email, password})
    return response.data;
}

export async function register(name: string, email: string, password: string){
    const response = await api.post('/auth/register' , {name, email,password})
    return response.data;
}

export async function logout(){
    const response = await api.post('/auth/logout')
    return response.data;
}

export async function refreshToken(){
    const response = await api.post('/auth/refresh-token')
    return response.data;
}