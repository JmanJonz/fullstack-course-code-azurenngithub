// @ts-nocheck
import prisma from "../../../../prisma/prismaSingleton";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const {sign, verify} = jwt;

export async function POST(request){
    const {email, password} = await request.json();
    if(!email || !password){
        return NextResponse.json({"error": "Include Correct Info"}, {"status": "400"})
    }

    // make jwt
    // xxxxxxxxxx ai got it wrong you do need to await jsonwebtoken operations
    // when in doubt await it out!
    // xxxxxxxxxxxxx also payload needs to be json it cannot just be a js object
    // i was creating invalid jwt because of it!
    // xxxxxxxxx need to use JSON with capital letters.stringify(jsobject)
        const generatedJWT = await sign(JSON.stringify(email), process.env.JSONWEBTOKENSECRET);

    // first check if the user already exists in the data base
    // if so verify that email passowrd combo match and that
    // password is correct
        const existingUser = await prisma.user.findUnique({where: {email}});
    // if there is not an existing user create one
        if(existingUser === null){
            // add user to database
            // XXXXXXXXX You need to await all db operations or else 
            // they will not finish!!!
            // but first hash password with salt!
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await prisma.user.create({"data": {
                email,
                password: hashedPassword
            }})
            // account created and no need to verify password since it was just created
            // return json web token to user for user proof
                return NextResponse.json({"jwt": generatedJWT, message: "Created Account & Logged In", newUser})
        }
        // XXXXXXXX you have to await bycrypt or else it just skips the whole thing and it passes as true...
        if(email === existingUser.email && await bcrypt.compare(password, existingUser.password)){
            // user email already exists and corresponding password is good
                return NextResponse.json({"jwt": generatedJWT, "message": "Account Already Exists, and password is correct"})
        }else{
            return NextResponse.json({"message": "Error, account already exists but password is incorrect"})
        }
}