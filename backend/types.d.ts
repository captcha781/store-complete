import express from "express"
import mongoose from "mongoose"

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
}

export interface RequestModified extends express.Request{
    user: any
}


export interface RouterModified extends express.IRouter{
    get: (path:string, ...middleware:any) => void;
    post: (path:string, ...middleware:any) => void;
    put: (path:string, ...middleware:any) => void;
    delete: (path:string, ...middleware:any) => void;
}

export interface MailObject {
    from : string,
    to: string,
    subject: string,
    text: string
}

