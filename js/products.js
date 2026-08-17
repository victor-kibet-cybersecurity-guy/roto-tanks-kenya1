
function money(n){return new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",maximumFractionDigits:0}).format(n).replace("KES","KSh");}
function productCard(p){
  const pageUrl=location.href.split("#")[0];
  const msg=`Hello, I am interested in the ${p.name} listed at ${money(p.price)}. Please confirm the latest price, availability and delivery cost to my location. Page: ${pageUrl}`;
  return `<article class="card product-card" data-name="${p.name.toLowerCase()}" data-category="${p.category}" data-capacity="${p.capacity}" data-price="${p.price}" data-app="${p.applications.join(" ").toLowerCase()}">
    <img src="${p.image}" width="800" height="600" loading="lazy" decoding="async" alt="${p.name} product illustration">
    <div class="product-body"><span class="pill">${p.category}</span><h3>${p.name}</h3>
    ${p.capacity?`<div class="capacity">${p.capacity.toLocaleString()} litres</div>`:""}
    <div class="price">${money(p.price)}</div><p class="muted">${p.shortDescription}</p>
    <div class="product-actions"><a class="btn btn-outline" href="products.html#${p.id}">View Details</a>
    <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waUrl(msg)}">WhatsApp Order</a></div></div></article>`;
}
function renderProducts(list,target="#productGrid"){
 const el=document.querySelector(target); if(!el)return; el.innerHTML=list.map(productCard).join("");
 const count=document.querySelector("#resultCount"); if(count)count.textContent=`${list.length} products`;
}
document.addEventListener("DOMContentLoaded",()=>{
 const featured=document.querySelector("#featuredProducts");
 if(featured) renderProducts(PRODUCTS.filter(p=>p.featured).slice(0,8),"#featuredProducts");
 const all=document.querySelector("#productGrid");
 if(all){ renderProducts(PRODUCTS); }
});
