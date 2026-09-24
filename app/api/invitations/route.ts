import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { db } from '@/lib'
import { isAuthenticated } from '@/lib/auth'
export async function GET(){if(!(await isAuthenticated()))return NextResponse.json({error:'Unauthorized'},{status:401});const invitations=await db.invitation.findMany({orderBy:{createdAt:'desc'},include:{events:{orderBy:{createdAt:'desc'},take:1}}});return NextResponse.json(invitations)}
export async function POST(req:NextRequest){if(!(await isAuthenticated()))return NextResponse.json({error:'Unauthorized'},{status:401});const body=await req.json().catch(()=>({}));const recipientName=String(body.recipientName??'').trim();if(!recipientName||recipientName.length>80)return NextResponse.json({error:'Некорректное имя'},{status:400});const invitation=await db.invitation.create({data:{token:crypto.randomBytes(24).toString('base64url'),recipientName}});return NextResponse.json({...invitation,url:`${req.nextUrl.origin}/invite/${invitation.token}`},{status:201})}
