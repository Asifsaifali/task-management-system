"use client"

import { createContext, useContext, useEffect, useState } from "react" 
import api from "@/lib/axios";


interface AuthCOntextType{
    accessToken : string | null;
    login : (email: string, password : string) => Promise<void>
    logout : ()=> Promise<void>;
    isAuthenticated : boolean;
}

const AuthContext = createContext<AuthCOntextType  | null>(null);



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