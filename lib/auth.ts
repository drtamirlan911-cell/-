import crypto from 'node:crypto'
import { cookies } from 'next/headers'
const COOKIE='ri_session'
const secret=()=>process.env.SESSION_SECRET||'dev-only-change-this-secret'
const sign=(value:string)=>crypto.createHmac('sha256',secret()).update(value).digest('base64url')
export async function isAuthenticated(){const value=(await cookies()).get(COOKIE)?.value;return !!value&&value===`tima.${sign('tima')}`}
export function sessionCookie(){return{name:COOKIE,value:`tima.${sign('tima')}`,httpOnly:true,sameSite:'lax' as const,secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30}}
export function clearSessionCookie(){return{name:COOKIE,value:'',httpOnly:true,sameSite:'lax' as const,secure:process.env.NODE_ENV==='production',path:'/',maxAge:0}}
export function validPassword(password:string){const expected=process.env.DASHBOARD_PASSWORD;if(!expected)return false;const a=Buffer.from(password),b=Buffer.from(expected);return a.length===b.length&&crypto.timingSafeEqual(a,b)}
