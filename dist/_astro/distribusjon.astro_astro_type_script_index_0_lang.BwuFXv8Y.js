const d=document.querySelectorAll(".quantity-option"),u=document.getElementById("quantity-selector");d.forEach(e=>{const n=e.querySelector('input[type="radio"]'),r=e.querySelector("div");e.addEventListener("click",()=>{if(d.forEach(t=>{const s=t.querySelector("div");s?.classList.remove("border-[#D4A574]","bg-[#FDF9F5]"),s?.classList.add("border-gray-200")}),r?.classList.remove("border-gray-200"),r?.classList.add("border-[#D4A574]","bg-[#FDF9F5]"),n.value==="select"){u?.classList.remove("hidden");const t=document.getElementById("batch-quantity");t&&(t.value="1",l(1))}else u?.classList.add("hidden"),l(1)})});const g=d[0];g&&g.click();const p=document.querySelectorAll(".distribution-option");p.forEach(e=>{const n=e.getAttribute("data-option"),r=e.querySelector(".option-icon"),t=e.querySelector(".expand-icon"),s=e.querySelector(n==="email-pdf"?".email-pdf-form":".sms-form");e.querySelector(".p-8")?.addEventListener("click",()=>{!s?.classList.contains("hidden")?(s?.classList.add("hidden"),e.classList.remove("border-[#D4A574]","bg-[#FDF9F5]"),e.classList.add("border-gray-200"),r?.classList.remove("bg-[#D4A574]"),r?.classList.add("bg-gray-400"),t?.classList.remove("rotate-180")):(p.forEach(c=>{if(c!==e){const E=c.querySelector(".email-pdf-form, .sms-form"),m=c.querySelector(".option-icon"),S=c.querySelector(".expand-icon");E?.classList.add("hidden"),c.classList.remove("border-[#D4A574]","bg-[#FDF9F5]"),c.classList.add("border-gray-200"),m?.classList.remove("bg-[#D4A574]"),m?.classList.add("bg-gray-400"),S?.classList.remove("rotate-180")}}),s?.classList.remove("hidden"),e.classList.remove("border-gray-200"),e.classList.add("border-[#D4A574]","bg-[#FDF9F5]"),r?.classList.remove("bg-gray-400"),r?.classList.add("bg-[#D4A574]"),t?.classList.add("rotate-180"))})});const A=document.getElementById("batch-quantity"),a=document.getElementById("custom-quantity"),y=document.getElementById("summary-quantity"),f=document.getElementById("summary-total-value"),b=document.getElementById("summary-transaction-cost"),v=document.getElementById("summary-total-paid"),D=250,I=20;function l(e){const n=e*D,r=e*I,t=n+r;y&&(y.textContent=`${e} stk`),f&&(f.textContent=`kr ${n.toLocaleString("nb-NO")}`),b&&(b.textContent=`kr ${r.toLocaleString("nb-NO")}`),v&&(v.textContent=`kr ${t.toLocaleString("nb-NO")}`),q(e)}function q(e){const n=document.getElementById("email-recipients-container"),r=document.getElementById("sms-recipients-container");if(n){const t=n.querySelectorAll(".recipient-group").length;if(e>t)for(let s=t+1;s<=Math.min(e,10);s++)h(s);else if(e<t){const s=n.querySelectorAll(".recipient-group");for(let o=t-1;o>=e;o--)s[o]?.remove()}}if(r){const t=r.querySelectorAll(".recipient-group").length;if(e>t)for(let s=t+1;s<=Math.min(e,10);s++)x(s);else if(e<t){const s=r.querySelectorAll(".recipient-group");for(let o=t-1;o>=e;o--)s[o]?.remove()}}}A?.addEventListener("change",e=>{const n=e.target;if(n.value==="custom")a?.classList.remove("hidden"),a?.focus();else{a?.classList.add("hidden");const r=parseInt(n.value);l(r)}});a?.addEventListener("input",e=>{const n=e.target,r=parseInt(n.value)||1;l(r)});function h(e){const n=document.getElementById("email-recipients-container");if(!n)return;const r=e||n.querySelectorAll(".recipient-group").length+1,t=document.createElement("div");t.className="recipient-group mb-4 p-4 bg-gray-50 rounded-lg",t.innerHTML=`
      <h4 class="text-sm font-medium text-gray-700 mb-3">Mottaker ${r}</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">E-postadresse *</label>
          <input 
            type="email" 
            placeholder="mottaker@eksempel.no"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Navn</label>
          <input 
            type="text" 
            placeholder="Skriv inn navn"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] text-sm"
          />
        </div>
      </div>
    `,n.appendChild(t)}function x(e){const n=document.getElementById("sms-recipients-container");if(!n)return;const r=e||n.querySelectorAll(".recipient-group").length+1,t=document.createElement("div");t.className="recipient-group mb-4 p-4 bg-gray-50 rounded-lg",t.innerHTML=`
      <h4 class="text-sm font-medium text-gray-700 mb-3">Mottaker ${r}</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mobilnummer *</label>
          <input 
            type="tel" 
            placeholder="+47 000 00 000"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Navn (valgfritt)</label>
          <input 
            type="text" 
            placeholder="Skriv inn navn"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] text-sm"
          />
        </div>
      </div>
    `,n.appendChild(t)}document.getElementById("add-email-recipient")?.addEventListener("click",()=>{const e=document.getElementById("email-recipients-container");e&&e.querySelectorAll(".recipient-group").length<100&&h()});document.getElementById("add-sms-recipient")?.addEventListener("click",()=>{const e=document.getElementById("sms-recipients-container");e&&e.querySelectorAll(".recipient-group").length<100&&x()});const L=document.querySelector(".sms-form textarea"),i=document.getElementById("sms-char-count");L?.addEventListener("input",()=>{const e=160-L.value.length;i&&(i.textContent=e.toString(),e<20?i.classList.add("text-red-600"):i.classList.remove("text-red-600"))});
