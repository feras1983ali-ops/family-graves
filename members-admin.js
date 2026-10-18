
'use strict';
async function refreshFamilyMembers(){
 const msg=el('membersMsg'),target=el('memberRequests');if(el('dashboard').classList.contains('hidden'))return;
 msg.textContent='جارٍ تحميل الأعضاء...';target.replaceChildren();
 const {data,error}=await db.from('family_members').select('user_id,role,full_name,created_at').order('created_at',{ascending:false});
 if(error){msg.textContent='تعذر عرض الطلبات: '+error.message;return}
 msg.textContent='عدد الحسابات: '+data.length;
 for(const m of data){const row=document.createElement('div');row.className='record';
 const info=document.createElement('div');const title=document.createElement('b');title.textContent=m.full_name||'عضو بدون اسم';
 const detail=document.createElement('div');detail.className='muted';detail.textContent=m.role==='pending'?'بانتظار الموافقة':m.role==='admin'?'مدير':m.role==='viewer'?'عضو مفعل':'مرفوض';
 info.append(title,detail);const actions=document.createElement('div');actions.className='toolbar';
 const options=m.role==='pending'?[['موافقة','viewer'],['رفض','rejected']]:m.role==='viewer'?[['إيقاف العضوية','rejected']]:m.role==='rejected'?[['إعادة التفعيل','viewer']]:[];
 for(const [label,role] of options){const btn=document.createElement('button');btn.textContent=label;btn.type='button';if(role==='rejected')btn.className='danger';btn.onclick=async()=>{if(!confirm('تأكيد: '+label+'؟'))return;btn.disabled=true;const r=await db.rpc('review_family_member',{target_user_id:m.user_id,new_role:role});if(r.error)alert('تعذر التحديث: '+r.error.message);await refreshFamilyMembers()};actions.append(btn)}
 row.append(info,actions);target.append(row)}
}
el('refreshMembers').onclick=refreshFamilyMembers;
(async()=>{const m=await currentMember();if(m?.role==='admin')await refreshFamilyMembers()})();
