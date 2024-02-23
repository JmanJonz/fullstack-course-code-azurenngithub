// @ts-nocheck
import prisma from "../../../../prisma/prismaSingleton";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const {sign, verify} = jwt;

export async function POST(request){
    const {senderEmail, receiverEmail, messageText} = await request.json();
    if(!senderEmail || !receiverEmail || !messageText){
        return NextResponse.json({"error": "Include Correct Info"}, {"status": "400"})
    }else{
        const newMessage = await prisma.message.create({data: {
            senderEmail,
            receiverEmail,
            messageText
        }})

        return NextResponse.json({newMessage});
    }
}

export async function GET(request){
    const allMessages =  await prisma.message.findMany();
    return NextResponse.json(allMessages);
}