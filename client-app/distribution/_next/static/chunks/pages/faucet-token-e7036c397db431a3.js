(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[376],{595:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/faucet-token",function(){return t(9442)}])},9442:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return q}});var n=t(5893),a=t(5067),l=t(7294),_=t(3444),i=t.n(_),r=t(8111),o=t.n(r);let c=e=>{let{theme:s="normal",className:t="",src:a="",width:_="auto",height:i="auto",alt:r="Metain Image"}=e,c=l.useRef(null),[d,u]=l.useState(!0),[p,m]=l.useState(a);function v(e){let s=e;return""===s?s="/image/zero/file-status-301.png":-1===s.indexOf("://")&&(s="".concat(s).replace(/\/\//g,"/")),s}function y(){m("/image/zero/file-status-404.png")}return l.useEffect(()=>{setTimeout(()=>u(!1),100)},[]),l.useEffect(()=>{m(v(a))},[e.src]),(0,n.jsx)("div",{ref:c,className:[o().pwImage,o()[s],d?o().skeleton:"",t].join(" "),children:"normal"===s?(0,n.jsx)("img",{className:o().img_1,src:v(p),width:_,height:i,alt:r,itemProp:"image",onError:y}):(0,n.jsx)(l.Fragment,{})})};var d=t(5380),u=t.n(d);let p=e=>{let{active:s}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("span",{id:u().component_back_drop_spinner,className:s?[u().active,"mLoading"].join(" "):""})})};var m=t(2286),v=t(1513),y=t(3546),h=t.n(y);let f=l.forwardRef((e,s)=>{let{theme:t="react-select",className:a="",isMulti:_=!1,options:i=[],value:r=[{value:"",label:"",icon:""}],height:o="4.2rem",dropdownWidth:c="20rem",placeholder:d="",required:u=[],disabled:p=!1,C_onChange:y=()=>{}}=e,f=l.useRef(null),x=l.useRef(null),[j,g]=l.useState(_?r:[r]),[w,b]=l.useState("");l.useImperativeHandle(s,()=>({getValue:S}));let{Option:N}=m.c;function S(){return j}l.useEffect(()=>{void 0!==e.value&&JSON.stringify(e.value)!==JSON.stringify(j)&&g(e.value)},[e.value]);let k=e=>{let{children:s,...t}=e;return(0,n.jsxs)(m.c.Control,{...t,children:[void 0!==t.selectProps.value[0]&&void 0!==t.selectProps.value[0].icon&&(0,n.jsx)("img",{src:t.selectProps.value[0].icon,alt:t.selectProps.value[0].label}),s]})},C=e=>(0,n.jsxs)(N,{...e,children:[void 0!==e.data.icon&&(0,n.jsx)("img",{className:h().img_1,src:e.data.icon,alt:e.data.label}),(0,n.jsx)("span",{className:h().span_1,children:e.data.label})]});return(0,n.jsx)("div",{ref:f,className:[h().pwSelectBox,h()[t],"input-group",p?h().disabled:"",a].join(" "),style:{"--height":o,"--dropdownWidth":c},children:"react-select"===t?(0,n.jsxs)(l.Fragment,{children:[(0,n.jsx)(v.ZP,{isDisabled:p,isMulti:_,classNamePrefix:"react-select",options:i,value:j,placeholder:d,components:_?{}:{Control:k,Option:C},onChange:function(e){let s;let t=_?e:[e],n=(s=[],t.forEach(e=>{""!==e.value&&(s=[...s,e.value])}),s).join(","),a=f.current.classList;g(t),b(n),y(t,f.current),(a.contains("invalid")||a.contains("valid"))&&(""===n?(a.add("invalid"),a.remove("valid")):(a.add("valid"),a.remove("invalid")))}}),(0,n.jsx)("input",{ref:x,className:"d-none",value:w,"data-required":u,readOnly:!0})]}):(0,n.jsx)(l.Fragment,{})})});f.displayName="SelectBox";var x=t(7191),j=t.n(x),g=t(4213),w=t(5065),b=t(2520),N=t(7474),S=t(8924),k=t(9473),C=t(5860);let T=()=>{var e;let s=BigInt(1e6),t=(null===(e=N.Z._currentWallet)||void 0===e?void 0:e.tokenForSelect)||[],{showToast:n}=(0,S.d$)(),a=(0,S.Fs)(),_=(0,k.v9)(b.H5),i=(0,k.I0)(),[r,o]=l.useState({[t[0].label]:0,[t[1].label]:0});l.useEffect(()=>{i(C.$h.getTokenBalanceRequested()),i(C.$h.getNftBalanceRequested())},[]);let c=async()=>{var e;let s=await (null===(e=N.Z._currentWallet)||void 0===e?void 0:e.getBalances())||{};return o(s),s},d=(e,s)=>{let t=j().decode(s),n=w.Keypair.fromSecretKey(t);return n},u=async(e,t)=>{t(!0);try{let a=new w.Connection(w.clusterApiUrl("devnet"),"confirmed"),l=new w.Transaction,i=new w.PublicKey(e.value),r=new w.PublicKey("FLU6UtBpAvZzprCcjK7UvS4Gu9bzd59KzQsUP3WmCXov"),o=d(a,"4YyfRr9hZyqRt7mAHBcBX1fFyK5JK4bmu7PT16Tq2gd87WVoTkadoAMPc4zuzaXx7dMitmLV2h9gZMv9rAKk5Jhn"),c=await g._Z(a,o,i,new w.PublicKey(_)),u=g.G7(i,c.address,r,BigInt(1001)*s);l.add(u),await w.sendAndConfirmTransaction(a,l,[o]),p(),n({status:"success",message:"Requested 1001 ".concat(e.label," successfully")})}catch(m){console.log("============ requestTokenHandler - ERROR: ",m)}finally{t(!1)}},p=async()=>{try{await new w.Connection(w.clusterApiUrl("devnet"),"confirmed").requestAirdrop(new w.PublicKey(_),w.LAMPORTS_PER_SOL),n({status:"success",message:"Requested SOL Airdrop successfully"})}catch(e){console.log("============ requestSOLAirdropHandler - ERROR: ",e)}finally{}};return{balances:r,walletAddress:_,deviceType:a,TOKEN_CONFIG:t,requestSOLAirdropHandler:p,requestTokenHandler:u,getBalances:c}},B=()=>{let{balances:e,TOKEN_CONFIG:s,getBalances:t}=T(),a=l.useRef(void 0),[_,r]=l.useState(s[0]),[o,c]=l.useState(!1);return l.useEffect(()=>(t(),a.current=setInterval(()=>{t()},1e4),()=>{console.log("============= CLEAR INTERVAL: ",a.current),a.current&&clearInterval(a.current)}),[]),(0,n.jsx)("div",{id:i().preorder_container,children:(0,n.jsxs)("div",{className:i().inner_content,children:[(0,n.jsx)(I,{selectToken:_,balances:e}),(0,n.jsx)(P,{selectToken:_,setSelectToken:r,disableRequestBtn:o,setDisableRequestToken:c})]})})},I=e=>{var s;let{selectToken:t,balances:a}=e;return(0,n.jsxs)("div",{id:i().header_wrapper,children:[(0,n.jsx)(c,{className:i().image_1,src:"/image/vot/vot-1.png"}),(0,n.jsxs)("div",{className:i().div_1,children:[(0,n.jsx)("span",{className:i().span_1,children:"FAUCET TOKEN"}),(0,n.jsxs)("div",{className:i().div_2,children:[(0,n.jsxs)("div",{className:i().div_3,children:[(0,n.jsxs)("div",{className:i().item_1,children:[(0,n.jsx)("span",{className:i().span_2,children:"Token symbol"}),(0,n.jsx)("span",{className:i().span_3,children:t.label})]}),(0,n.jsxs)("div",{className:i().item_1,children:[(0,n.jsx)("span",{className:i().span_2,children:"Balance"}),(0,n.jsx)("span",{className:i().span_3,children:(null==a?void 0:null===(s=a[t.label])||void 0===s?void 0:s.toString())||"0"})]})]}),(0,n.jsxs)("div",{className:i().item_1,children:[(0,n.jsx)("span",{className:i().span_2,children:"Token Address"}),(0,n.jsx)("span",{className:i().span_3,children:t.value})]})]})]})]})},P=e=>{let{selectToken:s,setSelectToken:t,disableRequestBtn:a,setDisableRequestToken:l}=e,{TOKEN_CONFIG:_,requestTokenHandler:r}=T();return(0,n.jsxs)("div",{id:i().confirmorder_wrapper,children:[(0,n.jsxs)("div",{className:"form-group",children:[(0,n.jsx)("span",{className:"title",children:"Choose a token to faucet"}),(0,n.jsx)(f,{className:i().selectbox_1,value:[s],options:_,C_onChange:e=>t(e[0])})]}),(0,n.jsx)("div",{className:i().separator_1}),(0,n.jsxs)("button",{disabled:a,className:[i().button_1,"mButton mButton-cn1-bp6"].join(" "),onClick:()=>r(s,l),children:["Request 1001 ".concat(s.label),(0,n.jsx)("br",{}),"& Get 1 SOL Airdrop (if any)"]}),(0,n.jsx)(p,{active:a})]})};B.displayName="FaucetTokenBox";var R=t(4397),L=t.n(R);let E=()=>(0,n.jsxs)("div",{id:L()["main-project-info-banner"],className:"mBlock",children:[(0,n.jsxs)("div",{className:L().div_1,children:[(0,n.jsx)("span",{className:L().span_1,children:"Devnet Mock-USDC Faucet"}),(0,n.jsx)("span",{className:L().span_2,children:"Use this faucet to get your mock USDC to test buying Metain REIT NFT."}),(0,n.jsxs)("ul",{className:L().listTutorialSteps,children:[(0,n.jsxs)("li",{className:L().tutorialStep,children:[(0,n.jsxs)("h4",{className:L().tutorialStepHeader,children:[(0,n.jsx)("span",{className:L().tutorialStepBullet,children:"1"}),"Get devnet SOL"]}),(0,n.jsxs)("p",{className:L().tutorialStepContent,children:["Go to a Solana Faucet like ",(0,n.jsx)("a",{href:"https://solfaucet.com/",children:"https://solfaucet.com/"})," to get SOL for transaction fee."]})]}),(0,n.jsxs)("li",{className:L().tutorialStep,children:[(0,n.jsxs)("h4",{className:L().tutorialStepHeader,children:[(0,n.jsx)("span",{className:L().tutorialStepBullet,children:"2"}),"Request mint"]}),(0,n.jsx)("p",{className:L().tutorialStepContent,children:"Click the request button to mint to mock USDC to the requested Solana devnet address."})]})]})]}),(0,n.jsx)("div",{className:L().div_2,children:(0,n.jsx)("span",{className:L().span_1,children:(0,n.jsx)("i",{className:[L().icon_1,"fml fm-gas-pump"].join(" ")})})})]});E.displayName="MainBanner";var O=t(6990),M=t.n(O);let A=()=>{let{deviceType:e}=T();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{id:M().row_1,children:[(0,n.jsx)("div",{id:M().column_2,children:(0,n.jsx)(E,{})}),(0,n.jsx)("div",{id:M().column_3,children:"browser"===e&&(0,n.jsx)(B,{})})]}),"browser"!==e&&(0,n.jsx)("div",{className:M().mobile_container,children:(0,n.jsx)(B,{})})]})};A.getLayout=function(e){return(0,n.jsx)(a.lq,{children:e})};var q=A},8924:function(e,s,t){"use strict";t.d(s,{d$:function(){return o},Fs:function(){return d}});var n=t(7294),a=t(5893),l=t(6455),_=t.n(l),i=t(782);let r=()=>{let e={padding:"0 1rem 5rem 1rem",showConfirmButton:!1,showCancelButton:!1,showCloseButton:!0},s={allowEnterKey:!1,allowOutsideClick:!1,showCancelButton:!0,showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}},t={icon:!1,position:i.Am.POSITION.BOTTOM_RIGHT,transition:(0,i.vU)({enter:"animate__animated animate__slideInRight",exit:"animate__animated animate__zoomOut"})};return{showPopup:function(s){let{status:t="success",title:n="",message:a="",...l}=s;_().fire({imageUrl:"none"!=t?"/image/zero/image-alert-".concat(t,".png"):"",imageWidth:200,imageHeight:200,title:n,html:a,...e,...l})},showAlert:function(e){let{title:t="",message:n="",C_confirm:a=()=>{},C_cancel:l=()=>{}}=e,i=_().fire({icon:"question",title:""===t?"Warning":t,html:""===n?"Confirm to perform action":n,confirmButtonText:"Confirm",cancelButtonText:"Cancel",...s});i.then(e=>{e.dismiss===_().DismissReason.cancel?l():a()})},showToast:function(e){let{status:s="success",title:l="",message:_="",duration:r=5e3}=e;(0,i.Am)((0,a.jsxs)(n.Fragment,{children:[(0,a.jsx)("div",{className:"title upper-case-text",children:s}),(0,a.jsx)("div",{className:"message",dangerouslySetInnerHTML:{__html:_}})]}),{type:s,autoClose:r,...t})}}};var o=r;let c=()=>{let[e,s]=n.useState(a());function t(){s(a())}function a(){return window.innerWidth>1007?"browser":window.innerWidth>700?"tablet-large":window.innerWidth>480?"tablet":"mobile"}return n.useEffect(()=>(t(),window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t)}),[]),e};var d=c},5380:function(e){e.exports={component_back_drop_spinner:"style_component_back_drop_spinner__0jXz2",active:"style_active__UwSCx"}},3444:function(e){e.exports={preorder_container:"styles_preorder_container__vq0rf",inner_content:"styles_inner_content__wrHQL",header_wrapper:"styles_header_wrapper__FVKtg",span_1:"styles_span_1__vokGL",arrow:"styles_arrow__Mce_e",span_2:"styles_span_2__hfGhH",span_3:"styles_span_3__IqBy5",image_1:"styles_image_1__N9CoX",item_1:"styles_item_1__fiavH",div_1:"styles_div_1__Ilp7g",div_2:"styles_div_2__Cavp0",div_3:"styles_div_3__bdBVB",countdown_1:"styles_countdown_1__EwpX5",preorder_wrapper:"styles_preorder_wrapper__QNZ1_",span_4:"styles_span_4__07MSH",span_5:"styles_span_5__tLSX0",span_6:"styles_span_6__gSK9j",button_1:"styles_button_1__IZhrj",active:"styles_active__MkIgV",wholesale_value_button:"styles_wholesale_value_button__TpmL2",div_4:"styles_div_4__5MQBN",block_span_4:"styles_block_span_4__et_Ck",deposit_modal:"styles_deposit_modal__BMorW",button_2:"styles_button_2___hlAk",confirmorder_wrapper:"styles_confirmorder_wrapper__GwIna",separator_1:"styles_separator_1__uuw4k",separator_2:"styles_separator_2__sLiw7",inputbox_1:"styles_inputbox_1__d9Gw3",selectbox_1:"styles_selectbox_1__vcO1L",fullPaymentMessage:"styles_fullPaymentMessage__LkMFV",fullPaymentMessage_Icon:"styles_fullPaymentMessage_Icon___UQF4",fullPaymentMessage_Content:"styles_fullPaymentMessage_Content__I0p7w",notify_wrapper:"styles_notify_wrapper__PsU7m",modalDepositPopup:"styles_modalDepositPopup__qG5xG",modalDepositTitle:"styles_modalDepositTitle__S5aTh",modalDepositContent:"styles_modalDepositContent__zw4LD",modalDepositButtonConfirm:"styles_modalDepositButtonConfirm__Cmtun"}},8111:function(e){e.exports={pwImage:"style_pwImage__wXuwW",normal:"style_normal__QNAeE",img_1:"style_img_1__y6jgd",skeleton_screen:"style_skeleton_screen__sC4FD","skeleton-screen":"style_skeleton-screen___yh_3"}},4397:function(e){e.exports={"main-project-info-banner":"styles_main-project-info-banner__jhUpw",icon_1:"styles_icon_1__3vofz",span_1:"styles_span_1__Iz1JK",span_2:"styles_span_2__bSVjT",span_3:"styles_span_3__JzmV8",span_4:"styles_span_4__35Hhz",span_5:"styles_span_5__1mlky",span_6:"styles_span_6__8eVaU",span_7:"styles_span_7__1SVZG",span_8:"styles_span_8__IL_xI",span_9:"styles_span_9__oOlXz",list_1:"styles_list_1__K3e51",listTutorialSteps:"styles_listTutorialSteps__xwg0s",tutorialStepHeader:"styles_tutorialStepHeader__aiQHy",tutorialStepBullet:"styles_tutorialStepBullet__X0W0t",tutorialStepContent:"styles_tutorialStepContent__fN466",image_1:"styles_image_1___scPG",button_1:"styles_button_1__3p3UR",item_1:"styles_item_1__0vt1I",div_1:"styles_div_1__Xpi9F",div_2:"styles_div_2__83EgG",div_3:"styles_div_3__i7nNG",div_4:"styles_div_4__L2Ihh"}},3546:function(e){e.exports={pwSelectBox:"style_pwSelectBox__Hcz_U","react-select":"style_react-select__yeI42",img_1:"style_img_1__40eSI",span_1:"style_span_1__rTCCQ",disabled:"style_disabled__22ZwW"}},6990:function(e){e.exports={faucet_token_wrapper:"style_faucet_token_wrapper__r0B07",selectbox_1:"style_selectbox_1__Zx9mV",div_1:"style_div_1__QUAkx",button_1:"style_button_1__L7cHk",row_1:"style_row_1__CkClw",column_2:"style_column_2__Pq3bQ",kyc_container:"style_kyc_container__MaQj5",column_3:"style_column_3__ARkJH",mobile_container:"style_mobile_container__1s3oY",revert:"style_revert__mZNn5"}}},function(e){e.O(0,[61,455,513,67,774,888,179],function(){return e(e.s=595)}),_N_E=e.O()}]);