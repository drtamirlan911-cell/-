import { NextResponse } from 'next/server'
import { sessionCookie, validPassword } from '@/lib/auth'
export async function POST(req:Request){const body=await req.json().catch(()=>({}));const password=String(body.password??'');if(!validPassword(password))return NextResponse.json({error:'Неверный пароль'},{status:401});const r=NextResponse.json({ok:true});r.cookies.set(sessionCookie());return r}
