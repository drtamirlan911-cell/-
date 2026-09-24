import {NextResponse} from 'next/server'
import {db} from '@/lib'
import {isAuthenticated} from '@/lib/auth'
export async function GET(_:Request,{params}:{params:Promise<{token:string}>}){if(!(await isAuthenticated()))return NextResponse.json({error:'Unauthorized'},{status:401});const {token}=await params;const inv=await db.invitation.findUnique({where:{token},include:{events:{orderBy:{createdAt:'asc'}}}});if(!inv)return NextResponse.json({error:'Not found'},{status:404});return NextResponse.json(inv.events)}
