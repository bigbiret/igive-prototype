const a={totalQuantity:10,valuePerCard:500};let l=a.totalQuantity;document.getElementById("total-cards-text").textContent=a.totalQuantity.toString();document.getElementById("card-count").textContent=l.toString();document.getElementById("total-value").textContent=(l*a.valuePerCard).toLocaleString("nb-NO");document.getElementById("stat-count").textContent=l.toString();document.getElementById("stat-value").textContent=l*a.valuePerCard/1e3+"K";const c=document.querySelector('[data-quantity="all"]'),o=document.getElementById("custom-quantity-input");o&&(o.max=a.totalQuantity.toString());function g(t){t?(c.classList.remove("border-gray-200"),c.classList.add("border-[#D4A574]","bg-[#FDF9F5]"),o.classList.remove("border-[#D4A574]","bg-[#FDF9F5]"),o.classList.add("border-gray-200"),o.value=""):(c.classList.remove("border-[#D4A574]","bg-[#FDF9F5]"),c.classList.add("border-gray-200"),o.classList.remove("border-gray-200"),o.classList.add("border-[#D4A574]","bg-[#FDF9F5]"))}c?.addEventListener("click",()=>{x(a.totalQuantity),g(!0)});o?.addEventListener("focus",()=>{g(!1)});o?.addEventListener("input",t=>{const s=t.target,e=parseInt(s.value);e>=1&&e<=a.totalQuantity&&(x(e),g(!1))});g(!0);function x(t){l=t;const s=t*a.valuePerCard;document.getElementById("card-count").textContent=t.toString(),document.getElementById("total-value").textContent=s.toLocaleString("nb-NO"),document.getElementById("stat-count").textContent=t.toString(),document.getElementById("stat-value").textContent=s/1e3+"K",b();const e=document.getElementById("form-container");e&&(e.innerHTML=""),document.getElementById("method-indicator")?.classList.add("hidden"),document.getElementById("no-preview")?.classList.remove("hidden"),document.getElementById("card-preview")?.classList.add("hidden")}function b(){const t=document.getElementById("delivery-cards");if(!t)return;let s=[];l>5?s=[{id:"pdf-qr",icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>',title:"FÅ PDF-FIL PÅ E-POST",description:"PDF med QR-koder for utskrift",badge:"QR-kode"},{id:"pdf-code",icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>',title:"HENTEKODER PÅ E-POST",description:"PDF med hentekoder for Mine Gavekort",badge:"Hentekode"}]:s=[{id:"sms",icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>',title:"HENTEKODER PÅ SMS",description:"Send hentekoder direkte til mottaker",badge:"Rask levering"},{id:"pdf-qr",icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>',title:"FÅ PDF-FIL PÅ E-POST",description:"PDF med QR-koder for utskrift",badge:"QR-kode"}],t.innerHTML=s.map(e=>`
      <div class="delivery-card bg-white rounded-xl border-2 border-gray-200 p-6 cursor-pointer hover:border-[#D4A574] hover:shadow-lg" data-method="${e.id}">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 bg-gradient-to-br from-[#D4A574]/20 to-[#C49560]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-7 h-7 text-[#C49560]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${e.icon}
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900 text-lg">${e.title}</h3>
              ${e.badge?`<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">${e.badge}</span>`:""}
            </div>
            <p class="text-sm text-gray-600">${e.description}</p>
          </div>
          <svg class="w-6 h-6 text-gray-400 check-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
    `).join(""),document.querySelectorAll(".delivery-card").forEach(e=>{e.addEventListener("click",()=>y(e))})}function y(t){document.querySelectorAll(".delivery-card").forEach(e=>{e.classList.remove("selected","border-[#D4A574]","bg-[#FDF9F5]"),e.classList.add("border-gray-200"),e.querySelector(".check-icon")?.classList.add("hidden")}),t.classList.add("selected","border-[#D4A574]","bg-[#FDF9F5]"),t.classList.remove("border-gray-200"),t.querySelector(".check-icon")?.classList.remove("hidden");const s=t.dataset.method;w(s),M(s),k(s)}function w(t){const s=document.getElementById("sms-preview-container"),e=document.getElementById("sms-preview-section"),v=document.getElementById("pdf-preview-container"),d=document.getElementById("pdf-preview-section"),h=document.getElementById("default-sidebar"),u=document.getElementById("preview-card-count"),p=document.getElementById("pdf-preview-card-count");u&&(u.textContent=l.toString()),p&&(p.textContent=l.toString()),t==="sms"?(e&&e.classList.remove("hidden"),d&&d.classList.add("hidden"),h&&h.classList.add("hidden"),s&&(s.innerHTML=`
          <div class="mx-auto" style="max-width: 280px;">
            <!-- iPhone 15 frame -->
            <div class="bg-black rounded-[2.75rem] p-[8px] shadow-2xl">
              <div class="bg-white rounded-[2.5rem] overflow-hidden">
                <!-- Dynamic Island -->
                <div class="relative h-[37px] bg-black">
                  <div class="absolute left-1/2 transform -translate-x-1/2 top-3 w-32 h-7 bg-black rounded-full"></div>
                </div>
                
                <!-- Status bar -->
                <div class="bg-white px-6 py-1 flex justify-between items-center text-xs -mt-6 relative z-10">
                  <span class="font-semibold text-black">9:41</span>
                  <div class="flex gap-1 items-center">
                    <svg class="w-4 h-3" viewBox="0 0 24 18" fill="currentColor">
                      <path d="M1 6l2-2v11a2 2 0 002 2h14a2 2 0 002-2V4l2 2V1h-5a2 2 0 00-2-2H8a2 2 0 00-2 2H1v5z"/>
                    </svg>
                    <svg class="w-4 h-3" viewBox="0 0 24 18" fill="currentColor">
                      <path d="M16 4l2 2v8a1 1 0 01-1 1H5a1 1 0 01-1-1V6l2-2h10z"/>
                    </svg>
                    <svg class="w-5 h-3" viewBox="0 0 24 18" fill="currentColor">
                      <rect x="1" y="6" width="18" height="10" rx="2"/>
                      <path d="M20 9v4" fill="white"/>
                      <rect x="21" y="8" width="2" height="6" rx="0.5"/>
                    </svg>
                  </div>
                </div>
                
                <!-- Messages header -->
                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div class="flex items-center justify-between">
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <div class="text-center">
                      <p class="font-semibold text-sm">Larvik By</p>
                      <p class="text-xs text-gray-500">SMS</p>
                    </div>
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                
                <!-- Message content -->
                <div class="bg-white px-3 py-4" style="height: 380px; overflow-y: auto;">
                  <div class="flex justify-start mb-2">
                    <div class="bg-gray-200 rounded-2xl px-4 py-3 max-w-[90%]">
                      <p class="text-[13px] leading-[18px] text-gray-800 whitespace-pre-line"><span id="sms-sender-name">{Avsender}</span> har gitt deg et gavekort på verdi kr ${a.valuePerCard},-

Gavekortet ligger tilgjengelig i appen Mine Gavekort, som du laster ned fra App Store eller Google Play.

Din hentekode er:
XXX-XXX-XXX

Med vennlig hilsen,
Larvik By</p>
                    </div>
                  </div>
                  <p class="text-[11px] text-center text-gray-400 mt-1">Levert</p>
                </div>
                
                <!-- Input area -->
                <div class="bg-gray-100 px-3 py-2 flex items-center gap-2">
                  <div class="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center">
                    <span class="text-gray-400 text-[13px]">iMessage</span>
                  </div>
                  <div class="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,setTimeout(()=>{const i=document.getElementById("sender-name-input");if(i){const r=()=>{const n=document.getElementById("sms-sender-name");n&&(n.textContent=i.value||"{Avsender}")};i.removeEventListener("input",r),i.addEventListener("input",r),r()}},100))):t==="pdf-qr"||t==="pdf-code"?(d&&d.classList.remove("hidden"),e&&e.classList.add("hidden"),h&&h.classList.add("hidden"),v&&(v.innerHTML=`
          <div class="mx-auto" style="max-width: 280px;">
            <!-- PDF document style container -->
            <div class="bg-white shadow-2xl rounded-sm" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
              <!-- PDF page with A4 aspect ratio -->
              <div class="relative" style="padding-top: 141.4%;">
                <div class="absolute inset-0 bg-white flex flex-col">
                  <!-- Top section with rotated gavekort info and QR -->
                  <div class="relative px-4 py-3">
                    <!-- Upside down gavekort header with credit card number -->
                    <div class="transform rotate-180 mb-2">
                      <p class="text-[10px] text-gray-600">Gavekort er gyldig til og med 4. september 2028</p>
                      <p class="text-xs font-mono tracking-wider text-gray-700 mt-1">9578 4106 9332 8996 626</p>
                      <p class="text-xs text-gray-600 mt-1">CVC: 121</p>
                    </div>
                    
                    <!-- QR Code section smaller and positioned -->
                    <div class="flex justify-center mt-3">
                      <div class="w-24 h-24 bg-black p-1">
                        <div class="w-full h-full bg-white p-0.5">
                          <svg viewBox="0 0 29 29" class="w-full h-full">
                            <rect width="29" height="29" fill="white"/>
                            <path fill="black" d="M0,0h7v7h-7zM8,0h1v1h1v1h-2zM10,0h2v2h-1v-1h-1zM12,0h1v1h-1zM14,0h1v1h1v-1h1v3h-1v-1h-1v-1h-1zM18,0h1v1h-1zM20,0h2v1h1v-1h6v7h-7v-6h-1v2h-1zM1,1v5h5v-5zM23,1v5h5v-5zM2,2h3v3h-3zM9,2h1v1h-1zM11,2h1v1h1v1h-1v1h-1v1h-1v1h-1v-1h1v-2h1zM13,2h1v1h-1zM18,2h2v3h1v1h-2v1h-1v-2h-1v-1h1zM24,2h3v3h-3zM8,3h1v1h-1zM14,3h1v2h-1zM16,3h1v1h-1zM9,4h1v3h-1zM13,4h1v1h-1zM21,4h1v1h-1zM0,5h1v1h1v1h-2zM11,5h1v1h1v1h-2zM15,5h1v1h1v2h-2v1h1v1h-2v-1h-1v-1h1v-1h1zM2,6h1v1h-1zM6,6h1v1h-1zM19,6h1v1h-1zM21,6h1v1h-1zM3,7h2v1h-1v1h-1zM17,7h1v1h-1zM10,8h1v1h1v1h-1v1h1v-1h1v2h-1v1h1v1h-3v-1h1v-1h-1v-1h-1v-1h1zM13,8h2v1h-1v1h-1zM16,8h1v2h1v-2h2v1h1v1h1v1h-1v1h-2v1h-1v-1h-1v1h-1v1h-1v-2h1v-2h1v1h1v-1h-1v-1h-1zM23,8h3v1h1v1h1v1h-2v-1h-1v1h1v1h-1v1h-1v-1h-1v1h-1v1h1v-1h1v1h1v1h2v1h1v-1h1v2h-1v3h-1v-1h-1v-1h1v-1h-1v1h-1v-2h-2v1h1v2h-1v-1h-1v-1h-1v2h-1v1h-1v1h2v-1h2v1h-1v1h1v1h1v1h1v-2h1v2h1v1h-1v1h-1v1h-2v-2h-1v3h-1v-2h-1v-1h1v-1h-2v1h-1v-3h-1v-2h-1v-1h1v-1h1v1h1v-1h-1v-1h2v-1h1v-3h-1v2h-1v-2h1v-1h1v1h1v-1h1v-1h-1zM27,8h2v1h-2zM0,9h1v2h1v-1h1v2h-1v1h1v1h-1v1h1v-1h2v1h-1v1h2v-1h1v2h1v1h-1v1h-1v1h-1v-1h-1v2h-1v-2h-1v1h-1v-1h-1v-1h1v-1h-1v-1h1v-2h-1zM5,9h3v1h-1v1h-1v-1h-1zM18,9h1v1h-1zM8,10h1v1h1v1h-2zM26,10h1v1h-1zM4,11h2v1h-2zM28,11h1v1h-1zM6,12h1v1h1v-1h1v2h-1v1h1v1h-1v1h1v1h-2v-2h-1v1h-1v-1h-1v-1h2v-1h-1v-1h1zM14,12h1v1h-1zM25,13h1v1h1v1h-2zM27,13h1v1h-1zM10,14h2v1h-1v1h-1v1h1v1h-1v1h1v-1h1v-1h1v3h-1v1h1v1h1v2h-1v1h-1v-1h-1v-1h1v-1h-2v1h-1v-3h1v-1h1v-1h-1zM28,14h1v2h-1zM16,15h1v1h-1zM14,16h1v1h1v1h-2zM18,17h1v1h2v1h-3zM26,17h1v1h-1zM0,18h1v1h1v1h1v-1h1v1h1v2h-2v1h2v1h1v-1h-1v-1h1v-1h1v1h-1v3h-1v1h2v1h1v1h-1v1h-7v-7h1v-1h-1zM28,18h1v1h-1zM16,19h1v1h-1zM23,19h2v1h-1v1h-1zM14,20h1v1h-1zM25,20h1v1h1v1h1v-1h1v5h-1v-1h-1v1h-1v1h-1v-1h-1v-2h1v-1h1v-1h-1zM1,21v5h5v-5zM17,21h3v1h1v1h-1v1h2v-1h1v2h1v1h-2v1h2v1h1v-1h1v2h-4v-1h1v-1h-2v1h-1v-1h-1v-1h-1v1h-1v-3h1v1h1v-1h-1v-1h-1zM22,21h1v1h-1zM2,22h3v3h-3zM7,22h1v1h-1zM13,22h1v3h1v-2h1v4h-3v-1h1zM21,22h1v1h-1zM16,25h1v2h1v1h-2zM18,26h3v1h-1v1h1v1h-2v-1h-1zM22,26h1v1h1v2h-2zM6,27h2v1h1v1h-3zM26,27h1v1h1v1h-2zM10,28h1v1h-1zM20,28h1v1h-1z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Gavekort på 500 kr - rotert -->
                    <div class="transform rotate-180 text-center mt-2">
                      <p class="text-lg font-bold">500 kr</p>
                      <p class="text-xs text-gray-600">Gavekort på</p>
                    </div>
                  </div>
                  
                  <!-- Personal message on the right side -->
                  <div class="absolute right-2 top-20 w-32">
                    <p class="text-[9px] text-gray-600 italic leading-relaxed text-right" id="pdf-message" style="writing-mode: vertical-rl; text-orientation: mixed;">Hilsen
alle oss på jobb

Gratulerer så mye med bestått
dektorgradseksamen!</p>
                  </div>
                  
                  <!-- Stavanger Sentrum logo centered -->
                  <div class="flex flex-col items-center justify-center py-4">
                    <p class="text-sm font-bold text-gray-800 tracking-wider">STAVANGER</p>
                    <p class="text-sm font-bold text-gray-800 tracking-wider mb-2">SENTRUM</p>
                    <div class="w-10 h-10 rounded-full border-4 border-gray-800"></div>
                  </div>
                  
                  <!-- Instructions on left side -->
                  <div class="absolute left-2 top-48 w-28">
                    <h3 class="font-semibold text-[10px] mb-1 text-gray-900">Hvordan betale med gavekortet i butikk</h3>
                    <ol class="text-[8px] space-y-0.5 text-gray-700">
                      <li>1. Skann QR-koden på forrige side</li>
                      <li>2. Velg «Skann butikkens QR kode»</li>
                      <li>3. Skann butikkens QR-kode</li>
                      <li>4. Skriv inn beløp og utfør betaling</li>
                      <li>5. Vis kontrollbildet til betjeningen</li>
                    </ol>
                  </div>
                  
                  <!-- CONGRATS section with letter blocks -->
                  <div class="flex-1 flex items-center justify-center px-4">
                    <div class="relative w-full h-32">
                      <!-- Pink background with scattered letter blocks effect -->
                      <div class="absolute inset-0 bg-pink-100 rounded-lg overflow-hidden">
                        <!-- Random letter blocks -->
                        <div class="absolute top-2 left-3 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">M</div>
                        <div class="absolute top-4 right-5 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">S</div>
                        <div class="absolute bottom-3 left-6 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">W</div>
                        <div class="absolute top-8 left-12 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">B</div>
                        <div class="absolute bottom-5 right-8 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">Z</div>
                        <div class="absolute top-3 right-12 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">T</div>
                        <div class="absolute bottom-8 left-14 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">N</div>
                        <div class="absolute top-12 right-3 w-5 h-5 bg-white rounded shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">O</div>
                        
                        <!-- CONGRATS letters in center -->
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="flex gap-0.5">
                            <div class="w-5 h-5 bg-green-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">C</div>
                            <div class="w-5 h-5 bg-yellow-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">O</div>
                            <div class="w-5 h-5 bg-blue-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">N</div>
                            <div class="w-5 h-5 bg-red-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">G</div>
                            <div class="w-5 h-5 bg-purple-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">R</div>
                            <div class="w-5 h-5 bg-orange-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">A</div>
                            <div class="w-5 h-5 bg-pink-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">T</div>
                            <div class="w-5 h-5 bg-teal-500 rounded shadow-md flex items-center justify-center text-[8px] font-bold text-white">S</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- App download section compact -->
                  <div class="px-4 py-3 bg-gray-50">
                    <p class="text-[9px] mb-2 text-gray-700">Vi anbefaler at du lagrer dette gavekortet på din mobiltelefon ved å laste ned Mine Gavekort appen.</p>
                    
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-8 h-8 bg-[#D4A574] rounded flex items-center justify-center flex-shrink-0">
                        <span class="text-[10px] font-bold text-white">MG</span>
                      </div>
                      <div>
                        <p class="text-[9px] font-semibold">Med Mine Gavekort appen:</p>
                        <p class="text-[8px] text-gray-600">• Har du alltid gavekortet med deg</p>
                        <p class="text-[8px] text-gray-600">• Alltid oppdatert saldo</p>
                        <p class="text-[8px] text-gray-600">• Betaler du enkelt rett fra mobilen</p>
                      </div>
                    </div>
                    
                    <div class="flex gap-1">
                      <div class="bg-black text-white px-2 py-0.5 rounded text-[8px] flex items-center gap-1">
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="white">
                          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                        </svg>
                        App Store
                      </div>
                      <div class="bg-black text-white px-2 py-0.5 rounded text-[8px] flex items-center gap-1">
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="white">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        Google Play
                      </div>
                    </div>
                  </div>
                  
                  <!-- Bottom GAVEKORT text -->
                  <div class="border-t-2 border-gray-200 bg-white py-3">
                    <h1 class="text-center text-2xl font-bold text-gray-800">GAVEKORT</h1>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- PDF shadow effect -->
            <div class="mt-1 h-1 bg-gradient-to-b from-gray-300 to-transparent opacity-50 rounded-b"></div>
          </div>
        `,setTimeout(()=>{const i=document.querySelector(".pdf-title-input"),r=document.querySelector(".pdf-message-input"),n=()=>{const m=document.getElementById("pdf-title"),f=document.getElementById("pdf-message");m&&i&&(m.textContent=i.value||"GAVEKORT"),f&&r&&(f.textContent=r.value||"Din personlige melding vises her...")};i&&(i.removeEventListener("input",n),i.addEventListener("input",n),n()),r&&(r.removeEventListener("input",n),r.addEventListener("input",n),n())},100))):(e&&e.classList.add("hidden"),d&&d.classList.add("hidden"),h&&h.classList.remove("hidden"))}function k(t){const s=document.getElementById("method-indicator"),e=document.getElementById("method-details");if(s&&e){s.classList.remove("hidden");const v={"pdf-qr":"PDF med QR-kode sendes til din e-post","pdf-code":"PDF med hentekoder sendes til din e-post",sms:"Hentekoder sendes via SMS til mottaker"};e.textContent=v[t]}}function M(t){const s=document.getElementById("form-container");if(!s)return;let e="";if(t==="pdf-qr")e=`
        <div id="pdf-qr-form" class="bg-white rounded-xl border border-gray-200 p-6 animate-fadeIn">
          <h3 class="font-semibold text-gray-900 mb-4">PDF-fil sendt med e-post</h3>
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <p class="text-sm text-gray-600">Du vil motta en PDF-fil som kan skrives ut og brettes til et gratulasjonsKort. Den som får gavekortet benytter QR-koden til betaling eller for å lagre gavekortet på sin egen mobiltelefon i appen Mine Gavekort.</p>
            <p class="text-xs text-gray-500 mt-2">NB! Gavekortene blir sendt samlet i en PDF-fil. Om du ønsker gavekortene i separate filer, bestiller du sending av ett gavekort om gangen.</p>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Din e-postadresse *</label>
              <input type="email" placeholder="din@epost.no" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Forsidetekst:</label>
              <input type="text" value="GAVEKORT" placeholder="GAVEKORT" class="pdf-title-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Personlig melding:</label>
              <textarea rows="5" placeholder="(Valgfritt) Skriv inn en personlig melding som legges inn på det utskriftsvennlige gavekortet. Eventuelt kan du la feltet stå tomt og heller skrive inn en melding for hånd etter du har skrevet ut gavekortet." class="pdf-message-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] resize-none text-sm"></textarea>
            </div>
          </div>
        </div>
      `;else if(t==="pdf-code")e=`
        <div id="pdf-code-form" class="bg-white rounded-xl border border-gray-200 p-6 animate-fadeIn">
          <h3 class="font-semibold text-gray-900 mb-4">PDF-fil sendt med e-post</h3>
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <p class="text-sm text-gray-600">Du vil motta en PDF-fil med hentekoder. Mottakeren registrerer kodene i appen Mine Gavekort for å få tilgang til gavekortene.</p>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Din e-postadresse *</label>
              <input type="email" placeholder="din@epost.no" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Forsidetekst:</label>
              <input type="text" value="GAVEKORT" placeholder="GAVEKORT" class="pdf-title-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Personlig melding:</label>
              <textarea rows="5" placeholder="(Valgfritt) Skriv inn en personlig melding som legges inn på det utskriftsvennlige gavekortet. Eventuelt kan du la feltet stå tomt og heller skrive inn en melding for hånd etter du har skrevet ut gavekortet." class="pdf-message-input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] resize-none text-sm"></textarea>
            </div>
          </div>
        </div>
      `;else if(t==="sms"){let v="";for(let d=1;d<=l;d++)v+=`
          <div class="bg-gray-50 rounded-lg p-4 mb-3">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Gavekort ${d}</h4>
            <div class="grid md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Mobilnummer</label>
                <input type="tel" placeholder="+47 000 00 000" class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] text-sm">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Navn (valgfritt)</label>
                <input type="text" placeholder="Mottakers navn" class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] text-sm">
              </div>
            </div>
          </div>
        `;e=`
        <div class="bg-white rounded-xl border border-gray-200 p-6 animate-fadeIn">
          <h3 class="font-semibold text-gray-900 mb-4">Send hentekoder på SMS</h3>
          <div class="space-y-4">
            <div class="max-h-64 overflow-y-auto pr-2">
              ${v}
            </div>
            <div class="border-t pt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Avsendernavn</label>
              <input type="text" id="sender-name-input" placeholder="Ditt navn (maks 11 tegn)" maxlength="11" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]">
            </div>
          </div>
        </div>
      `}s.innerHTML=e}b();
