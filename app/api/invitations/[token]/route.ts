import {NextResponse} from 'next/server'
import {db} from '@/lib'
export async function GET(_:Request,{params}:{params:Promise<{token:string}>}){const {token}=await params;const inv=await db.invitation.findUnique({where:{token}});if(!inv)return NextResponse.json({error:'Not found'},{status:404});return NextResponse.json(inv)}
