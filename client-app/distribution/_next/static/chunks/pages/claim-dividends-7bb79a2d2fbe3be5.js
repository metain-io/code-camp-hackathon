(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[189],{3664:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/claim-dividends",function(){return n(9372)}])},9372:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return F}});var i=n(5893),a=n(5067),d=n(4085),r=n(8924),s=n(7294),o=n(9473);let l=()=>{let t=(0,o.I0)(),{showToast:e}=(0,r.d$)(),n=(0,o.v9)(d._r),i=(0,o.v9)(d.KU),a=(0,o.v9)(d.Sg),l=(0,o.v9)(d.w2);s.useEffect(()=>{t(d.Mk.initRequested())},[]),s.useEffect(()=>{a==d.hJ.ClaimDividendFailed?e({status:"error",message:l}):a==d.hJ.ClaimDividendSucceeded&&(e({status:"success",message:"Claim dividend successful"}),t(d.Mk.initRequested()))},[a]);let c=()=>{console.log("handle buy nft"),t(d.Mk.claimDividendRequested())};return{status:a,userTotalUsdClaimableDividend:n,userTotalUsdClaimedDividend:i,handleClaimDividends:c}};var c=n(4345),m=n.n(c),u=n(3550),h=n.n(u);let f=new(h())(10).pow(new(h())(18));class v{static createFromNumber(t){let e=(function(t){let e=t+"";if(1>Math.abs(t)){let n=parseInt(t.toString().split("e-")[1]);n&&(t*=Math.pow(10,n-1),e="0."+Array(n).join("0")+t.toString().substring(2))}else{let i=parseInt(t.toString().split("+")[1]);i>19&&(i-=19,t/=Math.pow(10,i),e=t+Array(i+1).join("0"))}return e})(t).replace("-",""),n=e.split(/[^0-9]/);n[1]=(n[1]||"0").padEnd(18,"0").substring(0,18);let i=new(h())((t<0?"-":"")+n.join(""));return new v(i)}static createFromBn(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:18;if(e<0)throw Error("bnDecimals is less than 0");let n=new(h())(10).pow(new(h())(e)),i=t.mul(f);return 0!=e&&(i=i.div(n)),new v(i)}static add(t,e){let n=t._bn.add(e._bn);return new v(n)}static sub(t,e){let n=t._bn.sub(e._bn);return new v(n)}static mul(t,e){let n=t._bn.mul(e._bn).div(f);return new v(n)}static div(t,e){let n=t._bn.mul(f).div(e._bn);return new v(n)}static divRound(t,e){let n=t._bn.divRound(e._bn).mul(f);return new v(n)}static mod(t,e){let n=t._bn.mod(e._bn);return new v(n)}static floor(t){let e=t._bn.divmod(f),{div:n}=e;return t._bn.gte(n)?v.createFromBn(n.mul(f)):v.createFromBn(n.sub(new(h())(1)).mul(f))}static ceil(t){let e=t._bn.divmod(f),{div:n}=e;return t._bn.lte(n)?v.createFromBn(n.mul(f)):v.createFromBn(n.add(new(h())(1)).mul(f))}static round(t){let e=t._bn.divmod(f),{mod:n}=e,i=n.mul(new(h())(10)).abs().div(f);return i.gte(new(h())(5))?v.ceil(t):v.floor(t)}static format(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:",",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],d=t._bn.isNeg()?"-":"",r=t._bn.div(f).abs(),s=t._bn.mod(f).abs(),o=r.toString(10).split("").reverse().map((t,e)=>0!=e&&e%3==0?"".concat(t).concat(n):t).reverse().join(""),l=s.toString(10).padStart(18,"0").substring(0,e).padEnd(e,"0");return a||(l=l.replace(/0+$/g,"")),"".concat(d).concat(o).concat(l?i+l:"")}static convertToNumber(t){let e=t._bn.divmod(f),n=e.div.toString(10)+"."+e.mod.toString(10).replace("-","").padStart(18,"0");return t._bn.isNeg()&&"-"!==n[0]&&(n="-"+n),parseFloat(n)}static convertToBn(t,e){if(18==e)return new(h())(t._bn);let n=new(h())(10).pow(new(h())(Math.abs(18-e)));return e<18?t._bn.div(n):t._bn.mul(n)}static convertToString(t,e,n){return t._bn.toString(e||10,n)}toNumber(){return v.convertToNumber(this)}toBn(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:18;return v.convertToBn(this,t)}toString(t,e){return v.convertToString(this,t,e)}add(t){this._bn=v.add(this,t)._bn}sub(t){this._bn=v.sub(this,t)._bn}mul(t){this._bn=v.mul(this,t)._bn}div(t){this._bn=v.div(this,t)._bn}divRound(t){this._bn=v.divRound(this,t)._bn}mod(t){this._bn=v.mod(this,t)._bn}floor(){this._bn=v.floor(this)._bn}ceil(){this._bn=v.ceil(this)._bn}round(){this._bn=v.round(this)._bn}format(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".";return v.format(this,t,e,n)}eq(t){return this._bn.eq(t._bn)}gt(t){return this._bn.gt(t._bn)}gte(t){return this._bn.gte(t._bn)}lt(t){return this._bn.lt(t._bn)}lte(t){return this._bn.lte(t._bn)}eqz(){return this.eq(v.ZERO)}gtz(){return this.gt(v.ZERO)}gtez(){return this.gte(v.ZERO)}ltz(){return this.lt(v.ZERO)}ltez(){return this.lte(v.ZERO)}constructor(t){this._bn=t}}v.ZERO=v.createFromNumber(0);let _=()=>{var t,e;let{status:n,userTotalUsdClaimableDividend:a,userTotalUsdClaimedDividend:r,handleClaimDividends:s}=l(),o=v.createFromNumber(1e6),c=t=>{t.preventDefault(),s()};return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("form",{className:[m().form,"mBackground-style-1"].join(" "),children:(0,i.jsxs)("div",{className:m()["form-body"],children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{children:"Available (Claimable)"}),(0,i.jsxs)("p",{children:[n==d.hJ.Loading?"- -":n==d.hJ.LoadingFailed?"N/A":null===(t=v.div(v.createFromNumber(a||0),o))||void 0===t?void 0:t.format(2,"",".")," ","US$"]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{children:"Value (Claimed)"}),(0,i.jsxs)("p",{children:[n==d.hJ.Loading?"- -":n==d.hJ.LoadingFailed?"N/A":null===(e=v.div(v.createFromNumber(r||0),o))||void 0===e?void 0:e.format(2,"",".")," ","US$"]})]}),(0,i.jsx)("div",{children:(0,i.jsx)("button",{className:[m()["button-claim-dividends"],"mButton","mButton-cp5-bn1"].join(" "),onClick:c,disabled:n==d.hJ.Loading||n==d.hJ.LoadingFailed||n==d.hJ.ClaimingDividend||0==a,children:n==d.hJ.Loading?"Loading...":n==d.hJ.ClaimingDividend?"Processing...":"Claim"})})]})})})};var b=n(381),x=n.n(b),N=n(2331),p=n.n(N);let j=()=>{let t=(0,o.I0)(),e=(0,o.v9)(d.$h),n=(0,o.v9)(d.Sg);return s.useEffect(()=>{t(d.Mk.initRequested())},[]),{status:n,userDividensData:e}},g=()=>{let{status:t,userDividensData:e}=j(),n=v.createFromNumber(1e6);return(0,i.jsx)("div",{className:p()["table-wrapper"],children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{"data-name":"id",children:"ID"}),(0,i.jsx)("th",{"data-name":"project",children:"PROJECT"}),(0,i.jsx)("th",{"data-name":"from",children:"FROM"}),(0,i.jsx)("th",{"data-name":"to",children:"TO"}),(0,i.jsx)("th",{"data-name":"amount-nft",children:"AMOUNT NFT"}),(0,i.jsx)("th",{"data-name":"amount-dividend",children:"AMOUNT DIVIDEND"}),(0,i.jsx)("th",{"data-name":"status",children:"STATUS"})]})}),(0,i.jsx)("tbody",{children:t!=d.hJ.Loading&&(null==e?void 0:e.length)>0?e.map(t=>{let{id:e,project:a,dateFrom:d,dateTo:r,nft:s,dividend:o,status:l}=t;return(0,i.jsxs)("tr",{children:[(0,i.jsxs)("td",{"data-name":"id",children:["#",e]}),(0,i.jsx)("td",{"data-name":"project",children:a}),(0,i.jsx)("td",{"data-name":"from",children:d&&x()(d).format("DD - MM - YYYY")}),(0,i.jsx)("td",{"data-name":"to",children:r&&x()(r).format("DD - MM - YYYY")}),(0,i.jsx)("td",{"data-name":"amount-nft",children:s}),(0,i.jsxs)("td",{"data-name":"amount-dividend",children:[v.div(v.createFromNumber(o||0),n).format(2,"",".")," US$"]}),(0,i.jsx)("td",{"data-name":"status","data-value":l,children:l})]},e)}):t==d.hJ.Loading?(0,i.jsx)("tr",{"data-type":"empty-row",children:(0,i.jsx)("td",{colSpan:7,children:"Loading..."})}):(0,i.jsx)("tr",{"data-type":"empty-row",children:(0,i.jsx)("td",{colSpan:7,children:"No transaction yet"})})})]})})};var w=n(1664),M=n.n(w);v.createFromNumber(1e6);var y=n(5253),P=n.n(y);let S=()=>{let t=(0,o.I0)(),e=(0,o.v9)(d.$h),n=(0,o.v9)(d.Sg),[i,a]=s.useState([]);s.useEffect(()=>{t(d.Mk.initRequested())},[]);let r=s.useMemo(()=>{if(!e)return null;let t={};return e.forEach(e=>{let n,i,{dateFrom:a,dateTo:d,nft:r,dividend:s,dividendPerNFT:o,project:l,status:c}=e,m=x()(a),u=x()(d),f=u.startOf("day").diff(m.startOf("day"),"days",!1),_=v.createFromBn(new(h())(s),6),b=v.createFromBn(new(h())(o),6);for(let N=0;N<=f;N++){let p=m.clone().add(N,"days"),j=p.get("year"),g=p.get("month")+1,w=p.get("date");t[j]||(t[j]=new E),t[j][g]||(t[j][g]=new E),t[j][g][w]||(t[j][g][w]=new E);let M=t[j],y=n!=j;y&&M.projects.add(l),M.amountNft+=y?r:0,M.amountNftMin=M.amountNftMin?Math.min(r,M.amountNftMin):r,M.amountNftMax=M.amountNftMax?Math.max(r,M.amountNftMax):r,M.amountDividend.add(y?_:v.ZERO),M.dividendPerNftMin=M.dividendPerNftMin&&b.gte(M.dividendPerNftMin)?M.dividendPerNftMin:b,M.dividendPerNftMax=M.dividendPerNftMax&&b.lte(M.dividendPerNftMax)?M.dividendPerNftMax:b;let P=t[j][g],S=n!=j&&i!=g;S&&P.projects.add(l),P.amountNft+=y?r:0,P.amountNftMin=P.amountNftMin?Math.min(r,P.amountNftMin):r,P.amountNftMax=P.amountNftMax?Math.max(r,P.amountNftMax):r,P.amountDividend.add(y?_:v.ZERO),P.dividendPerNftMin=P.dividendPerNftMin&&b.gte(P.dividendPerNftMin)?P.dividendPerNftMin:b,P.dividendPerNftMax=P.dividendPerNftMax&&b.lte(P.dividendPerNftMax)?P.dividendPerNftMax:b;let O=t[j][g][w];O.projects.add(l),O.amountNft+=y?r:0,O.amountNftMin=O.amountNftMin?Math.min(r,O.amountNftMin):r,O.amountNftMax=O.amountNftMax?Math.max(r,O.amountNftMax):r,O.amountDividend.add(y?_:v.ZERO),O.dividendPerNftMin=O.dividendPerNftMin&&b.gte(O.dividendPerNftMin)?O.dividendPerNftMin:b,O.dividendPerNftMax=O.dividendPerNftMax&&b.lte(O.dividendPerNftMax)?O.dividendPerNftMax:b,n=j,i=g}}),t},[e]),l=s.useMemo(()=>{let t=r;for(let e=0;e<i.length;++e)t=null==t?void 0:t[i[e]];return t},[r,i]),c=()=>{i.pop(),a([...i])},m=t=>{i.length>=2||(i.push(t),a([...i]))};return{status:n,branchPath:i,currentUserDividendBranchData:l,popBranchPath:c,pushBranchPath:m}};class E{constructor(){this.projects=new Set,this.amountNft=0,this.amountNftMin=void 0,this.amountNftMax=void 0,this.amountDividend=v.createFromNumber(0),this.dividendPerNftMin=void 0,this.dividendPerNftMax=void 0}}let O=()=>{let{status:t,currentUserDividendBranchData:e,branchPath:n,popBranchPath:a,pushBranchPath:r}=S(),s=()=>{a()},o=t=>{r(t)};return(0,i.jsxs)(i.Fragment,{children:[(null==n?void 0:n.length)>0&&(0,i.jsxs)("button",{className:[P().button_1,"mButton mButton-cn1-bp5"].join(" "),onClick:s,children:[(0,i.jsx)("i",{className:"fml fm-arrow-left"}),"Back to detail of ",n.join(" - ")]}),(0,i.jsx)("div",{className:P()["table-wrapper"],children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{"data-name":"date",children:"YEAR"}),(0,i.jsx)("th",{"data-name":"project",children:"PROJECT"}),(0,i.jsx)("th",{"data-name":"nft-owned",children:"AMOUNT NFT (in range)"}),(0,i.jsx)("th",{"data-name":"claimed-dividend",children:"DIVIDEND PER NFT (in range)"}),(0,i.jsx)("th",{"data-name":"claimable-dividend",children:"AMOUNT DIVIDEND"})]})}),(0,i.jsx)("tbody",{children:t!=d.hJ.Loading&&e&&Object.keys(e).length>0?Object.keys(e).filter(t=>!isNaN(+t)).map(t=>{let{projects:a,amountNftMin:d,amountNftMax:r,amountDividend:s,dividendPerNftMin:l,dividendPerNftMax:c}=e[t];return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{"data-name":"date",onClick(){o(t)},children:(0,i.jsx)(M(),{href:"",children:[...n,t].join(" - ")})}),(0,i.jsx)("td",{"data-name":"project",children:[...a].join(", ")}),(0,i.jsx)("td",{"data-name":"nft-owned",children:d==r?d:"".concat(d," - ").concat(r)}),(0,i.jsxs)("td",{"data-name":"claimed-dividend",children:[l.eq(c)?l.format():"".concat(l.format()," - ").concat(c.format())," ","US$"]}),(0,i.jsxs)("td",{"data-name":"claimable-dividend",children:[s&&s.format()," US$"]})]},t)}):t==d.hJ.Loading?(0,i.jsx)("tr",{"data-type":"empty-row",children:(0,i.jsx)("td",{colSpan:5,children:"Loading..."})}):(0,i.jsx)("tr",{"data-type":"empty-row",children:(0,i.jsx)("td",{colSpan:5,children:"No transaction yet"})})})]})})]})};var T=n(4499),C=n.n(T);let D=()=>(0,i.jsxs)("div",{className:C().container,children:[(0,i.jsx)("h2",{className:C().title,children:"Claim Dividends"}),(0,i.jsx)("div",{className:C()["form-buy-nft-placeholder"],style:{marginBottom:"30px"},children:(0,i.jsx)(_,{})}),(0,i.jsx)("h2",{className:C().title,children:"Claim Dividends History"}),(0,i.jsx)("div",{className:C()["table-claim-dividends-history-placeholder"],children:(0,i.jsx)(g,{})}),(0,i.jsx)("br",{}),(0,i.jsx)("h2",{className:C().title,children:"User Dividends History - In detail"}),(0,i.jsx)("div",{className:C()["table-claim-dividends-history-placeholder"],children:(0,i.jsx)(O,{})})]});D.getLayout=function(t){return(0,i.jsx)(a.lq,{children:t})};var F=D},8924:function(t,e,n){"use strict";n.d(e,{d$:function(){return l},Fs:function(){return m}});var i=n(7294),a=n(5893),d=n(6455),r=n.n(d),s=n(782);let o=()=>{let t={padding:"0 1rem 5rem 1rem",showConfirmButton:!1,showCancelButton:!1,showCloseButton:!0},e={allowEnterKey:!1,allowOutsideClick:!1,showCancelButton:!0,showClass:{popup:"animate__animated animate__zoomIn"},hideClass:{popup:"animate__animated animate__zoomOut"}},n={icon:!1,position:s.Am.POSITION.BOTTOM_RIGHT,transition:(0,s.vU)({enter:"animate__animated animate__slideInRight",exit:"animate__animated animate__zoomOut"})};return{showPopup:function(e){let{status:n="success",title:i="",message:a="",...d}=e;r().fire({imageUrl:"none"!=n?"/image/zero/image-alert-".concat(n,".png"):"",imageWidth:200,imageHeight:200,title:i,html:a,...t,...d})},showAlert:function(t){let{title:n="",message:i="",C_confirm:a=()=>{},C_cancel:d=()=>{}}=t,s=r().fire({icon:"question",title:""===n?"Warning":n,html:""===i?"Confirm to perform action":i,confirmButtonText:"Confirm",cancelButtonText:"Cancel",...e});s.then(t=>{t.dismiss===r().DismissReason.cancel?d():a()})},showToast:function(t){let{status:e="success",title:d="",message:r="",duration:o=5e3}=t;(0,s.Am)((0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)("div",{className:"title upper-case-text",children:e}),(0,a.jsx)("div",{className:"message",dangerouslySetInnerHTML:{__html:r}})]}),{type:e,autoClose:o,...n})}}};var l=o;let c=()=>{let[t,e]=i.useState(a());function n(){e(a())}function a(){return window.innerWidth>1007?"browser":window.innerWidth>700?"tablet-large":window.innerWidth>480?"tablet":"mobile"}return i.useEffect(()=>(n(),window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}),[]),t};var m=c},4345:function(t){t.exports={form:"styles_form__tI2Po","form-header":"styles_form-header__mT71g","form-title":"styles_form-title__TABnc","form-body":"styles_form-body__HapY8","form-group":"styles_form-group__tPJRS","button-claim-dividends":"styles_button-claim-dividends__BLLeO"}},5253:function(t){t.exports={button_1:"styles_button_1__uxSWj","table-wrapper":"styles_table-wrapper__ej2p_"}},2331:function(t){t.exports={"table-wrapper":"styles_table-wrapper__hIUsI"}},4499:function(t){t.exports={container:"styles_container__a3YRw",title:"styles_title__cKoH3","table-claim-dividends-history-placeholder":"styles_table-claim-dividends-history-placeholder__T2CeK"}}},function(t){t.O(0,[885,61,455,67,774,888,179],function(){return t(t.s=3664)}),_N_E=t.O()}]);