
'use strict';
el('toggleSignup').onclick=()=>el('signupForm').classList.toggle('hidden');
el('signupForm').onsubmit=async e=>{
 e.preventDefault(); const msg=el('signupMsg');msg.textContent='جارٍ إنشاء الطلب...';
 const name=el('signupName').value.trim(),email=el('signupEmail').value.trim(),password=el('signupPassword').value;
 if(!name||password.length<8){msg.textContent='أدخل الاسم وكلمة مرور لا تقل عن 8 أحرف.';return}
 const {data,error}=await db.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:location.origin+location.pathname}});
 if(error){msg.textContent='تعذر إرسال الطلب: '+error.message;return}
 msg.textContent='تم إرسال الطلب. تحقق من بريدك لتأكيد الحساب إن طُلب ذلك، ثم انتظر موافقة المدير. إذا كان البريد مسجلاً سابقاً، استخدم تسجيل الدخول.';
 el('signupForm').reset();
 if(data.session){await db.auth.signOut()}
};
