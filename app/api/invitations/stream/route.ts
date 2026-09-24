import {NextRequest,NextResponse} from 'next/server'
import {isAuthenticated} from '@/lib/auth'
import {subscribe} from '@/lib/realtime'
export const dynamic='force-dynamic'
export async function GET(req:NextRequest){if(!(await isAuthenticated()))return NextResponse.json({error:'Unauthorized'},{status:401});const token=req.nextUrl.searchParams.get('token');if(!token)return NextResponse.json({error:'token required'},{status:400});const encoder=new TextEncoder();let stop=()=>{};let timer:ReturnType<typeof setInterval>|undefined;const stream=new ReadableStream({start(controller){const send=(data:unknown)=>controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));send({type:'connected'});stop=subscribe(token,send);timer=setInterval(()=>send({type:'heartbeat'}),15000)},cancel(){stop();if(timer)clearInterval(timer)}});return new Response(stream,{headers:{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','Connection':'keep-alive'}})}
