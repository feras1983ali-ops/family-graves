'use strict';
const cfg=window.FAMILY_CONFIG;
if(!cfg||!/^https:\/\//.test(cfg.supabaseUrl)||!cfg.supabaseAnonKey||cfg.supabaseAnonKey.startsWith('PASTE_')){
 document.body.innerHTML='<main><div class="panel"><h2>إعداد الموقع مطلوب</h2><p>أدخل Project URL و Publishable key في config.js أولاً.</p></div></main>';
 throw Error('Missing Supabase configuration');
}
const db=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
const el=id=>document.getElementById(id);
async function currentMember(){const {data:{user},error}=await db.auth.getUser();if(error||!user)return null;const r=await db.from('family_members').select('role').eq('user_id',user.id).maybeSingle();if(r.error||!r.data)return null;return {user,role:r.data.role};}
function download(filename,content){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([content],{type:'application/json;charset=utf-8'}));a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
