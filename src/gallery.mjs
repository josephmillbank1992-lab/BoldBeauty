const images = {
  lashes: [
    ["hybrids", "Hybrids + brow wax & tint", "Hybrid eyelash extensions with an eyebrow wax and tint by Jade"],
    ["classics-brown", "Classics in brown", "Brown classic eyelash extensions by Jade"],
    ["yy-lashes", "YY lashes", "YY eyelash extensions by Jade"],
    ["classics-black", "Classics in black", "Black classic eyelash extensions by Jade"],
    ["colour-lashes", "A touch of colour", "Eyelash extensions with purple accents by Jade"],
    ["wispy-hybrids", "Wispy hybrids", "Wispy hybrid eyelash extensions by Jade"],
    ["lash-result", "The finished look", "A client showing her finished eyelash extensions at Bold Beauty"],
    ["hybrids-before-after", "Before & after", "Lashes and brows before and after treatment by Jade"]
  ],
  brows: [
    ["brows-before-after", "Brow transformation", "Brow treatment before and after by Jade"],
    ["brow-result", "Brow detail", "A closer look at brows before and after treatment by Jade"]
  ],
  "lip-blush": [
    ["lip-blush-closeup", "Lip blush", "Close-up of lip blush immediately after treatment by Jade"],
    ["lip-blush-result", "Lip blush transformation", "Lips before and immediately after lip blush by Jade"],
    ["lip-blush-before-after", "A closer look", "Before and immediately after another lip blush treatment by Jade"]
  ]
};
export function gallery(id) {
  const items=images[id];
  if(!items) return "";
  return '<div class="work-gallery"><div class="gallery-heading"><p class="eyebrow">Jade\'s work</p><h3>'+(id==="lashes"?"Find your lash inspiration.":"See the detail.")+'</h3></div><div class="work-grid '+(id==="lashes"?"lash-gallery":"")+'">'+items.map(([file,label,alt])=>'<figure><a class="work-photo" href="/assets/'+file+'.webp" aria-label="View full image: '+label.replaceAll("&","&amp;")+'"><img src="/assets/'+file+'.webp" alt="'+alt+'" width="900" height="'+(["brows","lip-blush"].includes(id)||file.includes("before-after")||file==="colour-lashes"?"900":"1200")+'" loading="lazy" decoding="async"></a><figcaption>'+label+'</figcaption></figure>').join("")+'</div>'+(id==="lip-blush"?'<p class="result-note">These photos show results immediately after treatment. Colour changes as the lips heal; Jade will explain what to expect and how to care for them.</p>':"")+'</div>';
}
export function awards(full=false) {
 return '<section class="section awards" id="awards"><div class="section-heading"><div><p class="eyebrow">Recognised in 2025</p><h2>Care. Detail. Recognition.</h2></div></div><div class="award-copy"><p><strong>Beautician of the Year — national third place, 2025.</strong></p><p>Bold Beauty was recognised at the GB Beauty &amp; UK Hair Awards.</p></div>'+(full?'<div class="award-grid"><figure><a href="/assets/award-third-place.webp"><img src="/assets/award-third-place.webp" alt="Bold Beauty: Beautician of the Year, national third place, GB Beauty and UK Hair Awards 2025" width="1100" height="733" loading="lazy"></a><figcaption>National third place · 2025</figcaption></figure><figure><a href="/assets/award-finalist.webp"><img src="/assets/award-finalist.webp" alt="Bold Beauty: Beautician of the Year finalist certificate for 2025" width="1100" height="732" loading="lazy"></a><figcaption>Beautician of the Year finalist · 2025</figcaption></figure></div>':'<a class="text-link" href="/about/#awards">Explore Jade\'s experience &amp; awards <span aria-hidden="true">↗</span></a>')+'</section>';
}



