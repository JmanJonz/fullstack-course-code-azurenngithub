// @ts-nocheck
import prisma from "../../../../prisma/prismaSingleton";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const {sign, verify} = jwt;

export async function POST(request){
    const {user1Email, user2Email} = await request.json();
    if(!user1Email || !user2Email){
        return NextResponse.json({"error": "Include Correct Info"}, {"status": "400"})
    }else{
        const newChat = await prisma.chatRoom.create({data: {
            user1Email,
            user2Email
        }})

        return NextResponse.json({newChat});
    }
}