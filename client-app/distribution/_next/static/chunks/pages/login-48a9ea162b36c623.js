(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{3700:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return n(7328)}])},7328:function(e,t,n){"use strict";n.r(t);var i=n(5893),o=n(5067),a=n(4370),s=n(2520),r=n(8924),c=n(7294),l=n(9473),u=n(584),m=n.n(u);let d=()=>{let{showToast:e}=(0,r.d$)(),t=(0,l.v9)(s.wi);return c.useEffect(()=>{t&&e({status:"error",message:t.message})},[t]),(0,i.jsxs)("div",{className:m()["page-container"],children:[(0,i.jsx)("span",{className:m()["text-welcome"],children:"Hi, Welcome Back!"}),(0,i.jsx)("div",{className:m()["button-connect-placeholder"],children:(0,i.jsx)(a.Pr,{})})]})};d.getLayout=function(e){return(0,i.jsx)(o.g1,{children:e})},t.default=d},8924:function(e,t,n){"use strict";n.d(t,{d$:function(){return l},Fs:function(){return m}});var i=n(7294),o=n(5893),a=n(6455),s=n.n(a),r=n(782);let c=()=>{let e={padding:"0 1rem 5rem 1rem",showConfirmButton:!1,showCancelButton:!1,showCloseButton:!0},t={allowEnterKey:!1,allowOutsideClick:!1,showCancelButton:!0,showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}},n={icon:!1,position:r.Am.POSITION.BOTTOM_RIGHT,transition:(0,r.vU)({enter:"animate__animated animate__slideInRight",exit:"animate__animated animate__zoomOut"})};return{showPopup:function(t){let{status:n="success",title:i="",message:o="",...a}=t;s().fire({imageUrl:"none"!=n?"/image/zero/image-alert-".concat(n,".png"):"",imageWidth:200,imageHeight:200,title:i,html:o,...e,...a})},showAlert:function(e){let{title:n="",message:i="",C_confirm:o=()=>{},C_cancel:a=()=>{}}=e,r=s().fire({icon:"question",title:""===n?"Warning":n,html:""===i?"Confirm to perform action":i,confirmButtonText:"Confirm",cancelButtonText:"Cancel",...t});r.then(e=>{e.dismiss===s().DismissReason.cancel?a():o()})},showToast:function(e){let{status:t="success",title:a="",message:s="",duration:c=5e3}=e;(0,r.Am)((0,o.jsxs)(i.Fragment,{children:[(0,o.jsx)("div",{className:"title upper-case-text",children:t}),(0,o.jsx)("div",{className:"message",dangerouslySetInnerHTML:{__html:s}})]}),{type:t,autoClose:c,...n})}}};var l=c;let u=()=>{let[e,t]=i.useState(o());function n(){t(o())}function o(){return window.innerWidth>1007?"browser":window.innerWidth>700?"tablet-large":window.innerWidth>480?"tablet":"mobile"}return i.useEffect(()=>(n(),window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}),[]),e};var m=u},584:function(e){e.exports={"page-container":"styles_page-container__RLP7y","text-welcome":"styles_text-welcome__A8aXm","button-connect-placeholder":"styles_button-connect-placeholder__Qm62y"}}},function(e){e.O(0,[61,455,67,774,888,179],function(){return e(e.s=3700)}),_N_E=e.O()}]);