(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[168],{876:function(e,t,s){"use strict";var a=s(5893),l=s(7294),i=s(1664),_=s.n(i),n=s(1163),r=s(3512),o=s.n(r);let c=e=>{let{theme:t="normal",className:s="",href:i="",onClickHandler:r=e=>{},disabled:c=!1,isOpenNewTab:m=!1}=e,d=(0,n.useRouter)(),p="".concat(o().pwAnchor," ").concat(o()[t]," ").concat(s).trim();return"normal"===t?c?(0,a.jsx)("a",{className:[p,s].join(" "),children:e.children}):-1===i.indexOf("://")?(0,a.jsx)(_(),{href:{pathname:"#"===i?"#":i,query:d.query.lang&&{lang:d.query.lang}},target:m?"_blank":"",children:(0,a.jsx)("span",{className:[p,s].join(" "),onClick:r,children:e.children})}):(0,a.jsx)("a",{className:[p,s].join(" "),href:i,target:"_blank",rel:"noreferrer noopenner",onClick:r,children:e.children}):(0,a.jsx)(l.Fragment,{})};t.Z=c},481:function(e,t,s){"use strict";var a=s(5893),l=s(7294),i=s(5786),_=s.n(i);let n=e=>{let{theme:t="normal",className:s="",src:i="",width:n="auto",height:r="auto",alt:o="Metain Image"}=e,c=l.useRef(null),[m,d]=l.useState(!0),[p,u]=l.useState(i);function g(e){let t=e;return""===t?t="/image/zero/file-status-301.png":-1===t.indexOf("://")&&(t="".concat(t).replace(/\/\//g,"/")),t}function h(){u("/image/zero/file-status-404.png")}return l.useEffect(()=>{setTimeout(()=>d(!1),100)},[]),l.useEffect(()=>{u(g(i))},[e.src]),(0,a.jsx)("div",{ref:c,className:[_().pwImage,_()[t],m?_().skeleton:"",s].join(" "),children:"normal"===t?(0,a.jsx)("img",{className:_().img_1,src:g(p),width:n,height:r,alt:o,itemProp:"image",onError:h}):(0,a.jsx)(l.Fragment,{})})};t.Z=n},5067:function(e,t,s){"use strict";s.d(t,{lq:function(){return B},g1:function(){return p}});var a=s(5893);s(5675),s(1664);var l=s(7294),i=s(8101),_=s.n(i);let n=["/images/app/auth-layout/slider/images/1.png","/images/app/auth-layout/slider/images/2.png","/images/app/auth-layout/slider/images/3.png","/images/app/auth-layout/slider/images/4.png"],r=[["/images/app/auth-layout/slider/satelite-icons/icon-sattelite-chart.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-mei.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-usdt.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-dollar.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-busd.svg"],["/images/app/auth-layout/slider/satelite-icons/icon-sattelite-kpmg.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-ey.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-d.svg","/images/app/auth-layout/slider/satelite-icons/icon-sattelite-w.svg"]],o=()=>{let[e,t]=l.useState(0),[s,a]=l.useState(0),i=()=>{let s=(e+1)%n.length;t(()=>s)},_=e=>{e<0||e>=n.length||t(()=>e)};return l.useEffect(()=>{let t=3==e?1:0;a(()=>t);let s=setTimeout(()=>{i()},3e3);return()=>{clearInterval(s)}},[e]),{sliderImages:n,sateliteIcons:r,currentSliderImageIndex:e,currentSateliteIconsIndex:s,changeToNextSliderImage:i,changeSliderImageIndex:_}},c=()=>{let{sliderImages:e,sateliteIcons:t,currentSliderImageIndex:s,currentSateliteIconsIndex:l,changeSliderImageIndex:i}=o();return(0,a.jsxs)("div",{id:_().banner_container,children:[(0,a.jsx)("div",{id:_().logo_wrapper,children:(0,a.jsx)("img",{className:_().image_1,src:"/images/app/logo/horizontal-blue.png"})}),(0,a.jsxs)("div",{id:_().animation_wrapper,"data-index":l,children:[(0,a.jsxs)("div",{className:_().div_2,children:[(0,a.jsx)("img",{src:"".concat(e[s]),className:_().image_3}),(0,a.jsxs)("div",{className:_().div_1,children:[t[l].map((e,t)=>(0,a.jsx)("div",{className:_().item_1,children:(0,a.jsx)("img",{src:"".concat(e),className:_().image_2})},"Sattelite-".concat(l,"-").concat(e,"-").concat(t))),(0,a.jsx)("img",{src:"/images/app/auth-layout/slider/background.svg",className:_().image_1})]})]}),(0,a.jsx)("div",{id:_().pagination_wrapper,children:e.map((e,t)=>(0,a.jsx)("div",{className:[_().item_2,s===t?_().active:""].join(" "),onClick:()=>i(t)},t))})]},"Sattelite-Wrapper-".concat(l))]})};var m=s(7290),d=s.n(m);let p=e=>{let{children:t}=e;return(0,a.jsx)("div",{id:d().authorize_controller,children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"row",children:[(0,a.jsx)("div",{id:d().left_wrapper,className:"col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12",children:(0,a.jsx)("div",{className:"row",children:(0,a.jsx)("div",{className:"col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12",children:t})})}),(0,a.jsx)("div",{id:d().right_wrapper,className:"col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12",children:(0,a.jsx)("div",{className:"row",children:(0,a.jsx)("div",{className:"col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 offset-lg-2",children:(0,a.jsx)(c,{})})})})]})})})};var u=s(7690),g=s.n(u);let h=e=>{let{children:t}=e;return(0,a.jsx)("div",{id:g().content_wrapper,className:"container-fluid",children:t})};var y=s(4370),v=s(5342),x=s.n(v);let f=e=>{let{theme:t="normal",className:s="",src:i="",width:_="auto",height:n="auto",alt:r="Metain Image"}=e,o=l.useRef(null),[c,m]=l.useState(!0),[d,p]=l.useState(i);function u(e){let t=e;return""===t?t="/image/zero/file-status-301.png":-1===t.indexOf("://")&&(t="".concat(t).replace(/\/\//g,"/")),t}function g(){p("/image/zero/file-status-404.png")}return l.useEffect(()=>{setTimeout(()=>m(!1),100)},[]),l.useEffect(()=>{p(u(i))},[e.src]),(0,a.jsx)("div",{ref:o,className:[x().pwImage,x()[t],c?x().skeleton:"",s].join(" "),children:"normal"===t?(0,a.jsx)("img",{className:x().img_1,src:u(d),width:_,height:n,alt:r,itemProp:"image",onError:g}):(0,a.jsx)(l.Fragment,{})})};var j=s(4087),w=s.n(j);let b=()=>(0,a.jsxs)("div",{id:w().fixedbar_container,children:[(0,a.jsx)(y.JE,{}),(0,a.jsx)("div",{className:w().separator}),(0,a.jsx)(N,{})]}),N=()=>(0,a.jsxs)("div",{id:w().account_wrapper,children:[(0,a.jsxs)("div",{className:w().div_1,"data-bs-toggle":"dropdown","data-bs-auto-close":"outside",children:[(0,a.jsx)(f,{className:w().image_1,src:"/image/zero/image-default-avatar-2.png",alt:""}),(0,a.jsx)("i",{className:[w().icon_1,"fms fm-ellipsis-v-alt"].join(" ")})]}),(0,a.jsx)("div",{className:[w().dropdown_1,"dropdown-menu"].join(" "),children:(0,a.jsx)("div",{className:w().div_4,children:(0,a.jsx)(y.bk,{})})})]});var k=s(1163),I=s(562),T=s.n(I),z=s(4762),C=s(876),E=s(481);let S=()=>{let e=(0,k.useRouter)(),t=l.useRef(null),[s,i]=l.useState([]),[_,n]=l.useState(!1),r=l.useMemo(()=>[{title:"Client",children:[{name:"Dashboard",icon:"fms fm-th-large",url:"dashboard",className:""},{name:"VOT1",icon:"fms fm-building",url:"vot-1",className:""},{name:"Claim Dividends",icon:"fms fm-usd-circle",url:"claim-dividends",className:""},{name:"Wallet",icon:"fms fm-wallet",url:"wallet",className:""}]},{title:"Admin",children:[{name:"Share Dividend",icon:"fms fm-usd-circle",url:"share-dividend",className:_?T().notify_error:""}]},{title:"Utilities",children:[{name:"Token Faucet",icon:"fms fm-gas-pump",url:"faucet-token"}]}],[_]);function o(e){null===e.target.closest("#".concat(T().navigation_wrapper))&&(e.target.id===T().button_wrapper?t.current.classList.add(T().active):t.current.classList.remove(T().active))}l.useEffect(()=>(document.addEventListener("click",o),()=>{document.removeEventListener("click",o)}),[]);let c=t=>{let[s,l]=t,i=e.pathname.split("/"),_=l.url.split("/");return(0,a.jsxs)("li",{className:[T().item_2,null==l?void 0:l.className,i[1]===_[0]?T().active:""].join(" "),"data-tip":!!l.tooltips,"data-for":!!l.tooltips&&"tooltip-".concat(s),children:[(0,a.jsx)("b",{className:T().b_1}),(0,a.jsx)("b",{className:T().b_2}),(0,a.jsxs)(C.Z,{className:T().anchor_1,href:"/".concat(l.url),disabled:l.disabled,children:[(0,a.jsx)("i",{className:[l.icon,T().icon_1].join(" ")})," ",l.name,!!l.tooltips&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(z.Z,{id:"tooltip-".concat(s),type:"warning",effect:"solid",place:"right",children:(0,a.jsx)("div",{className:T().commission_tooltip_area,style:{maxWidth:"163px"},children:(0,a.jsx)("span",{dangerouslySetInnerHTML:{__html:l.tooltips.content}})})})})]})]},"Navigation-Item-2-".concat(s))},m=e=>{let[t,l]=e,_=s.includes(l.title)?T().collapse:"";return(0,a.jsxs)("li",{className:T().item_1,children:[(0,a.jsx)("span",{className:[T().span_1,_].join(" "),onClick(){var e;let t;return e=l.title,void i(t=(t=s).includes(e)?t.filter(t=>t!==e):[...t,e])},children:l.title}),(0,a.jsx)("ul",{className:[T().list_2,_].join(" "),children:Object.entries(l.children).map(c)})]},"Navigation-Item-1-".concat(t))};return(0,a.jsxs)(l.Fragment,{children:[(0,a.jsx)("i",{id:T().button_wrapper,className:[T().icon_1,"fml fm-bars"].join(" ")}),(0,a.jsxs)("div",{ref:t,id:T().navigation_wrapper,children:[(0,a.jsx)("div",{id:T().logo_block,children:(0,a.jsx)(C.Z,{href:"/dashboard",children:(0,a.jsx)(E.Z,{src:"/image/zero/image-logo.png"})})}),(0,a.jsx)("div",{id:T().scroll_block,children:(0,a.jsx)("nav",{className:[T().nav_1,"navbar"].join(" "),children:(0,a.jsx)("div",{id:"menu-collapse",className:[T().collapse_1,"navbar-collapse"].join(" "),children:(0,a.jsx)("ul",{className:T().list_1,children:Object.entries(r).map(m)})})})})]})]})};var O=s(5062),L=s.n(O);let B=e=>{let{children:t}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"container-fluid",children:(0,a.jsx)("div",{className:"row",children:(0,a.jsxs)("div",{id:L().admin_controller,className:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12",children:[(0,a.jsx)(S,{}),(0,a.jsx)(b,{}),(0,a.jsx)(h,{children:t})]})})})})}},8924:function(e,t,s){"use strict";s.d(t,{d$:function(){return o},Fs:function(){return m}});var a=s(7294),l=s(5893),i=s(6455),_=s.n(i),n=s(782);let r=()=>{let e={padding:"0 1rem 5rem 1rem",showConfirmButton:!1,showCancelButton:!1,showCloseButton:!0},t={allowEnterKey:!1,allowOutsideClick:!1,showCancelButton:!0,showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}},s={icon:!1,position:n.Am.POSITION.BOTTOM_RIGHT,transition:(0,n.vU)({enter:"animate__animated animate__slideInRight",exit:"animate__animated animate__zoomOut"})};return{showPopup:function(t){let{status:s="success",title:a="",message:l="",...i}=t;_().fire({imageUrl:"none"!=s?"/image/zero/image-alert-".concat(s,".png"):"",imageWidth:200,imageHeight:200,title:a,html:l,...e,...i})},showAlert:function(e){let{title:s="",message:a="",C_confirm:l=()=>{},C_cancel:i=()=>{}}=e,n=_().fire({icon:"question",title:""===s?"Warning":s,html:""===a?"Confirm to perform action":a,confirmButtonText:"Confirm",cancelButtonText:"Cancel",...t});n.then(e=>{e.dismiss===_().DismissReason.cancel?i():l()})},showToast:function(e){let{status:t="success",title:i="",message:_="",duration:r=5e3}=e;(0,n.Am)((0,l.jsxs)(a.Fragment,{children:[(0,l.jsx)("div",{className:"title upper-case-text",children:t}),(0,l.jsx)("div",{className:"message",dangerouslySetInnerHTML:{__html:_}})]}),{type:t,autoClose:r,...s})}}};var o=r;let c=()=>{let[e,t]=a.useState(l());function s(){t(l())}function l(){return window.innerWidth>1007?"browser":window.innerWidth>700?"tablet-large":window.innerWidth>480?"tablet":"mobile"}return a.useEffect(()=>(s(),window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),e};var m=c},7690:function(e){e.exports={content_wrapper:"style_content_wrapper__9VmyA",row_1:"style_row_1__eVXlQ",column_2:"style_column_2__Oetu2",column_3:"style_column_3__ZDZrf",column_4:"style_column_4__wuS1t",revert:"style_revert__lYCIO"}},5342:function(e){e.exports={pwImage:"style_pwImage__vT3l0",normal:"style_normal__2jWmE",img_1:"style_img_1__G5ywV",skeleton_screen:"style_skeleton_screen__IJB0X","skeleton-screen":"style_skeleton-screen__sP6Br"}},4087:function(e){e.exports={fixedbar_container:"style_fixedbar_container__LHy9x",separator:"style_separator__EMBYM",image_1:"style_image_1__HLW2v",icon_1:"style_icon_1__H_3pC",wallet_wrapper:"style_wallet_wrapper__zntGK",span_1:"style_span_1__fk_7i",language_wrapper:"style_language_wrapper__7NXud",notify_wrapper:"style_notify_wrapper__7QRiS",dropdown_1:"style_dropdown_1__EkaDl",slideInUp2:"style_slideInUp2__bWjBL",div_1:"style_div_1__z0_Eq",div_3:"style_div_3__inI6x",div_4:"style_div_4__Kk4bx",div_5:"style_div_5__YuAUD",empty:"style_empty__tnrSY",span_4:"style_span_4__9nHah",read:"style_read__pR2TX",span_3:"style_span_3__fWzXh",icon_3:"style_icon_3__n7TNB",div_6:"style_div_6__9_pQH",div_7:"style_div_7__yhMtg",span_2:"style_span_2__zkTLz",icon_2:"style_icon_2__Siza0",account_wrapper:"style_account_wrapper__jHfl8",anchor_1:"style_anchor_1__2vO5Y",image_2:"style_image_2__7c0zT",image_3:"style_image_3__G_SS7",checkbox_1:"style_checkbox_1__TqbB7",checkbox_2:"style_checkbox_2__vKE5X",div_2:"style_div_2__O4IM2",slideInUp1:"style_slideInUp1__KBXqC"}},3512:function(e){e.exports={pwAnchor:"styles_pwAnchor__ig4Hv",normal:"styles_normal__uwtfN"}},5786:function(e){e.exports={pwImage:"style_pwImage__cKfZX",normal:"style_normal__EvgHt",img_1:"style_img_1__MA_xM",skeleton_screen:"style_skeleton_screen__V_0Eu","skeleton-screen":"style_skeleton-screen__0PDPL"}},562:function(e){e.exports={navigation_wrapper:"style_navigation_wrapper__NeKu1",logo_block:"style_logo_block__lmKK0",scroll_block:"style_scroll_block__i6mqx",nav_1:"style_nav_1___48Pl",anchor_1:"style_anchor_1__5zTC5",span_1:"style_span_1__yQBnO",collapse:"style_collapse__svbxX",span_2:"style_span_2__BNTgR",span_3:"style_span_3__TMG7C",icon_1:"style_icon_1__hOLLX",button_1:"style_button_1__GJww6",image_1:"style_image_1__OPWDO",div_1:"style_div_1__goINW",div_2:"style_div_2__1oIEQ",item_1:"style_item_1__ezQZq",item_2:"style_item_2__1dMU2",notify_error:"style_notify_error__FIb_7",b_1:"style_b_1__99c2_",b_2:"style_b_2__Dr_Cw",active:"style_active__ABHaX",commission_tooltip_area:"style_commission_tooltip_area__X63hQ",list_1:"style_list_1__WvZh5",list_2:"style_list_2__Y7zC6",button_wrapper:"style_button_wrapper__RLIM0"}},5062:function(e){e.exports={admin_controller:"style_admin_controller__s3tKl",empty_breadcum:"style_empty_breadcum__IOc9Y"}},8101:function(e){e.exports={banner_container:"styles_banner_container__YwUhU",logo_wrapper:"styles_logo_wrapper__dTknD",image_1:"styles_image_1__fbboH",animation_wrapper:"styles_animation_wrapper__ybDXp",image_3:"styles_image_3__QIoPp",item_1:"styles_item_1__OVYLA",rotateReverse:"styles_rotateReverse__TnD_y",scaleSmaller:"styles_scaleSmaller__OVAII",div_1:"styles_div_1__gsNkI",rotateAround:"styles_rotateAround__XegkE",div_2:"styles_div_2__fp6ah",pagination_wrapper:"styles_pagination_wrapper__vmKDu",item_2:"styles_item_2__0TehS",active:"styles_active__HwISy"}},7290:function(e){e.exports={authorize_controller:"styles_authorize_controller__QDai0",left_wrapper:"styles_left_wrapper__LMU6_",modal_block:"styles_modal_block__rGPLJ",span_1:"styles_span_1__4DT56",span_2:"styles_span_2__r79DV",icon_1:"styles_icon_1___j_5P",div_1:"styles_div_1__N5_c3",button_1:"styles_button_1__dlvF3",image_101:"styles_image_101__AHJk3",selectbox_1:"styles_selectbox_1__es8iZ",right_wrapper:"styles_right_wrapper__oexfa",outer_wrapper:"styles_outer_wrapper__w868r"}}}]);