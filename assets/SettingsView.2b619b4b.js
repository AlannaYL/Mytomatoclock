import{u as g,s as V,r as e,o as a,c as w,w as o,a as l,b as t,d as c,e as b,f as _,F as k,t as x,i as B}from"./index.62ec7ce7.js";const S=t("h1",{class:"text-center"},"\u8A2D\u5B9A",-1),y=t("thead",null,[t("tr",null,[t("th",null,"\u540D\u7A31"),t("th",null,"\u8A66\u807D"),t("th",null,"\u9078\u64C7")])],-1),C=["src"],F=t("td",null,null,-1),D={__name:"SettingsView",setup(N){const d=g(),{alarms:i,selectedAlarms:n}=V(d);return(R,u)=>{const r=e("v-col"),p=e("v-radio"),m=e("v-radio-group"),v=e("v-table"),f=e("v-row");return a(),w(f,{id:"settings"},{default:o(()=>[l(r,{cols:"12"},{default:o(()=>[S]),_:1}),l(r,{cols:"12"},{default:o(()=>[l(v,null,{default:o(()=>[y,t("tbody",null,[(a(!0),c(k,null,b(_(i),s=>(a(),c("tr",{key:s.id},[t("td",null,x(s.name),1),t("td",null,[t("audio",{src:s.file,controls:""},null,8,C)]),F,l(m,{modelValue:_(n),"onUpdate:modelValue":u[0]||(u[0]=h=>B(n)?n.value=h:null)},{default:o(()=>[l(p,{value:s.id},null,8,["value"])]),_:2},1032,["modelValue"])]))),128))])]),_:1})]),_:1})]),_:1})}}};export{D as default};
