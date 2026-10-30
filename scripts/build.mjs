import { mkdir, rm, writeFile, cp } from "node:fs/promises";
import {
  business as b,
  treatments,
  qualifications,
  reviews,
} from "../src/data.mjs";
import { services } from "../src/services.mjs";
import { priceMenu } from "../src/price-menu.mjs";
import { gallery, awards } from "../src/gallery.mjs";
const out = new URL("../dist/", import.meta.url);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(new URL("../public/", import.meta.url), out, { recursive: true });
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const arrow = '<span aria-hidden="true">↗</span>';
const book = (label = "Book on Booksy", classes = "") =>
  '<a class="button ' +
  classes +
  '" href="' +
  b.booksy +
  '">' +
  label +
  " " +
  arrow +
  "</a>";
const logo =
  '<img src="/assets/logo.png" alt="Be you be… Bold Beauty" width="512" height="443">';
const header = (path) =>
  '<a class="skip" href="#main">Skip to content</a><div class="announcement">Beauty appointments in Lowton</div><header class="site-header"><div class="header-inner"><a class="logo" href="/" aria-label="Bold Beauty home">' +
  logo +
  '</a><button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="main-nav">Menu <svg viewBox="0 0 24 18" aria-hidden="true"><path d="M0 3h24M0 9h24M0 15h24" stroke="currentColor"/></svg></button><nav class="site-nav" id="main-nav" aria-label="Main navigation">' +
  [
    ["/", "Home"],
    ["/treatments/", "Treatments"],
    ["/about/", "About Jade"],
  ]
    .map(
      ([url, name]) =>
        '<a href="' +
        url +
        '"' +
        (url === path ? ' aria-current="page"' : "") +
        ">" +
        name +
        "</a>",
    )
    .join("") +
  book() +
  "</nav></div></header>";
const footer =
  '<section class="booking-band" aria-label="Book an appointment"><div><h2>Ready for your next appointment?</h2><p>Find your treatment, choose your time. Book directly with Jade.</p></div>' +
  book("Book on Booksy", "light") +
  '</section><footer class="site-footer"><div class="footer-top"><div><a class="footer-logo" href="/" aria-label="Bold Beauty home">' +
  logo +
  '</a></div><div><p class="footer-title">Find us in Lowton</p><address>33 Church Lane<br>Lowton, Warrington<br>WA3 2AS</address></div><div><p class="footer-title">Stay in touch</p><div class="footer-links"><a href="' +
  b.whatsapp +
  '">WhatsApp Jade ↗</a><a href="tel:+447850411949">07850 411949</a><a href="' +
  b.instagram +
  '">Instagram ↗</a><a href="' +
  b.google +
  '">Google reviews ↗</a><a href="' +
  b.booksy +
  '">Book an appointment ↗</a></div></div></div><div class="footer-bottom"><span>© ' +
  new Date().getFullYear() +
  ' Bold Beauty. Be you. Be bold.</span><a href="/privacy/">Privacy & cookies</a><span>Website by <a href="https://thewebsitemill.co.uk/">The Website Mill</a></span></div></footer><a class="mobile-book" href="' +
  b.booksy +
  '"><span>Book your appointment</span><span aria-hidden="true">↗</span></a>';
const schema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: b.name,
  description:
    "Lashes, brows, lip blush and skin treatments with Jade in Lowton.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "33 Church Lane",
    addressLocality: "Lowton",
    addressRegion: "Warrington",
    postalCode: "WA3 2AS",
    addressCountry: "GB",
  },
  telephone: "+447850411949",
  sameAs: [b.instagram, b.booksy],
  hasMap: b.google,
};
const layout = (path, title, description, content) =>
  '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101010"><title>' +
  esc(title) +
  '</title><meta name="description" content="' +
  esc(description) +
  '"><meta name="robots" content="noindex,nofollow"><meta property="og:type" content="website"><meta property="og:title" content="' +
  esc(title) +
  '"><meta property="og:description" content="' +
  esc(description) +
  '"><meta property="og:locale" content="en_GB"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">' +
  JSON.stringify(schema) +
  '</script><script src="/site.js" defer></script><script type="module" src="/enquiry.mjs"></script><script id="service-catalogue" type="application/json">' +
  JSON.stringify(services) +
  "</script></head><body>" +
  header(path) +
  '<main id="main">' +
  content +
  "</main>" +
  footer +
  "</body></html>";
const lips =
  '<svg viewBox="0 0 160 160" aria-hidden="true"><path d="M15 84c22-7 39-37 65-17 26-20 43 10 65 17-23 1-43 34-65 34S37 85 15 84Z"/><path d="M15 84c23 1 43 7 65 7s42-6 65-7M53 78c8-1 16 5 27 5s19-6 27-5"/></svg>';
const skin =
  '<svg viewBox="0 0 160 160" aria-hidden="true"><path d="M93 16c-33 0-55 24-55 57 0 31 14 64 42 69 24-5 42-35 42-66 0-34-15-60-29-60Z"/><path d="M55 68c8-5 14-5 22 0m17 0c8-5 14-5 22 0M83 75l-5 24h13M68 114c9 5 17 5 26 0M134 24v24m-12-12h24M22 104v16m-8-8h16"/></svg>';
const visual = (t) =>
  t.image
    ? '<img src="' +
      t.image +
      '" alt="' +
      esc(t.alt) +
      '" loading="lazy" width="900" height="1200" style="object-position:' +
      t.position +
      '">'
    : '<div class="card-art ' +
      (t.id === "skin" ? "skin" : "") +
      '">' +
      (t.id === "skin" ? skin : lips) +
      "<small>" +
      t.name +
      "</small></div>";
const cards =
  '<div class="treatment-grid">' +
  treatments
    .map(
      (t) =>
        '<a class="treatment-card" href="/treatments/#' +
        t.id +
        '"><div class="image">' +
        visual(t) +
        "</div><h3>" +
        t.name +
        "</h3><p>" +
        t.description +
        '</p><span class="text-link">Explore ' +
        arrow +
        "</span></a>",
    )
    .join("") +
  "</div>";
const reviewSection =
  '<section class="section reviews"><div class="section-heading"><div><p class="eyebrow">A few words from our clients</p><h2>Beauty, with a personal touch.</h2></div><a class="text-link" href="' +
  b.google +
  '">Read Google reviews ' +
  arrow +
  '</a></div><div class="review-grid">' +
  reviews
    .map(
      (r) =>
        '<blockquote class="review"><div class="stars" aria-label="5 stars">★★★★★</div><p>“' +
        esc(r.quote) +
        "”</p><footer>" +
        esc(r.name) +
        "<span>Google review</span></footer></blockquote>",
    )
    .join("") +
  "</div></section>";
const home =
  '<section class="hero"><div class="hero-copy"><p class="eyebrow">Be you. Be bold.</p><h1>Your beauty.<br>A little bolder.</h1><p>Lashes, brows, lip blush and skin treatments with Jade in Lowton.</p><div class="hero-actions"><a class="button" href="/treatments/">Explore treatments ' +
  arrow +
  '</a><a class="text-link" href="' +
  b.booksy +
  '">Book an appointment</a></div></div><div class="hero-media hero-collage" aria-label="A selection of work by Jade"><img class="hero-main-photo" src="/assets/classics-brown.webp" alt="Brown classic eyelash extensions by Jade" fetchpriority="high" width="900" height="1200"><img src="/assets/brows-before-after.webp" alt="Before and after a brow treatment by Jade" width="900" height="900"><img src="/assets/lip-blush-closeup.webp" alt="Lip blush immediately after treatment by Jade" width="900" height="900"></div></section><nav class="treatment-ribbon" aria-label="Treatment categories"><a href="/treatments/#lashes">Lashes</a><span>/</span><a href="/treatments/#brows">Brows</a><span>/</span><a href="/treatments/#lip-blush">Lip Blush</a><span>/</span><a href="/treatments/#skin">Skin & Facials</a></nav><section class="section"><div class="section-heading"><div><p class="eyebrow">A little something for you</p><h2>Find your feel-good treatment.</h2></div><a class="text-link" href="/treatments/">View all treatments ' +
  arrow +
  "</a></div>" +
  cards +
  '</section><section class="intro"><div class="intro-art jade-photo"><img src="/assets/jade-working.webp" alt="Jade carrying out a beauty treatment at Bold Beauty" width="345" height="445" loading="lazy"></div><div class="intro-copy"><p class="eyebrow">Meet your beauty technician</p><h2>A little time,<br>just for you.</h2><p>I’m Jade, the face behind Bold Beauty. With eight years of experience and a love for helping you feel your best, I offer beauty treatments in a welcoming Lowton setting.</p><div class="credentials"><span>Qualified</span><span>Certified</span><span>Insured</span></div><a class="button" href="/about/">Meet Jade ' +
  arrow +
  "</a></div></section>" +
  awards(false) + reviewSection;
const faq =
  '<section class="section faq"><p class="eyebrow">Before your appointment</p><h2>A few helpful details.</h2>' +
  [
    [
      "How do I book?",
      "Use any Book on Booksy button to view Jade’s current services, prices and available appointments. Your booking is completed on Booksy.",
    ],
    [
      "Where is Bold Beauty?",
      "You’ll find Jade at 33 Church Lane, Lowton, Warrington, WA3 2AS. If you need help finding the location, contact Jade before your visit.",
    ],
    [
      "How much are treatments?",
      "Explore the treatment menu above for Jade’s guide prices, including lash add-on offers. Confirm the final price and appointment details on Booksy or with Jade before booking.",
    ],
    [
      "Do I need a consultation or patch test?",
      "Requirements depend on the treatment. Contact Jade before booking if you’re unsure about suitability, consultation or patch testing. Follow the preparation instructions she provides.",
    ],
    [
      "Can I change an appointment?",
      "Please use your Booksy booking details to check the available options and the cancellation policy that applies to your appointment. Contact Jade if you need help.",
    ],
  ]
    .map(
      ([q, a]) =>
        "<details><summary>" + q + "</summary><p>" + a + "</p></details>",
    )
    .join("") +
  "</section>";
const treatmentsPage =
  '<section class="page-heading"><p class="eyebrow">Lashes. Brows. Lips. Skin.</p><h1>Find your kind of bold.</h1><p>Explore the treatments, find your inspiration and book your time with Jade.</p></section><nav class="category-nav" aria-label="Jump to a treatment">' +
  treatments
    .map((t) => '<a href="#' + t.id + '">' + t.name + " ↓</a>")
    .join("") +
  '<a href="#prices">Prices & enquiries ↓</a></nav>' +
  priceMenu() +
  '<div class="section">' +
  treatments
    .map(
      (t) =>
        '<section class="treatment-detail" id="' +
        t.id +
        '"><div class="detail-visual">' +
        visual(t) +
        '</div><div class="detail-copy"><p class="eyebrow">' +
        t.number +
        " / " +
        t.name +
        "</p><h2>" +
        t.heading +
        "</h2><p>" +
        t.description +
        "</p><p>" +
        t.detail +
        "</p>" +
        book("View prices & book") +
        "</div>" + gallery(t.id) + "</section>",
    )
    .join("") +
  "</div>" +
  faq;
const about =
  '<section class="page-heading"><p class="eyebrow">The face behind Bold Beauty</p><h1>Hello, I’m Jade.</h1><p>Eight years in beauty. A personal approach to every appointment.</p></section><section class="section about-story"><div class="logo-panel jade-about-photo"><img src="/assets/jade-masked.webp" alt="Jade wearing her Bold Beauty uniform and face covering" width="327" height="445" loading="lazy"></div><div class="prose"><p class="eyebrow">Be you. Be bold.</p><h2>Beauty that feels<br>like you.</h2><p>I’m a beauty technician based in Lowton, with eight years of experience. I’m fully qualified, certified and insured, with training across lashes, brows, semi-permanent makeup and skin treatments.</p><p>Whether you’re visiting for your regular lash appointment or exploring something new, we can talk through the look you have in mind and the treatment options available.</p><p class="eyebrow" style="margin-top:40px">Experience & training</p><ul class="qualification-list">' +
  qualifications.map((q) => "<li>" + q + "</li>").join("") +
  "</ul>" +
  book("Find your appointment") +
  '</div></section>' + awards(true) + '<section class="section location"><div><p class="eyebrow">Your local beauty appointment</p><h2>See you in Lowton.</h2></div><div><address>33 Church Lane<br>Lowton, Warrington<br>WA3 2AS</address><p>Check Booksy for current appointment availability. For treatment questions or help finding us, message Jade on WhatsApp or call 07850 411949.</p><div class="actions"><a class="button outline" href="https://www.google.com/maps/search/?api=1&amp;query=33+Church+Lane+Lowton+WA3+2AS">Get directions ' +
  arrow +
  '</a><a class="text-link" href="' +
  b.whatsapp +
  '">Message Jade on WhatsApp ' +
  arrow +
  "</a></div></div></section>" +
  reviewSection;
const privacy =
  '<section class="page-heading"><p class="eyebrow">Your information</p><h1>Privacy & cookies.</h1></section><article class="section legal"><p>This notice explains how this website works and where your information goes when you book or contact Bold Beauty.</p><h2>Using this website</h2><p>This website does not include an account login or advertising trackers. Its guided enquiry lets you select treatments and optionally add your name, client status and a message. The hosting provider may process technical request information, such as your IP address, to deliver and protect the website.</p><h2>Booking an appointment</h2><p>Booking buttons take you to Booksy. Information you enter there is processed through Booksy and used by Bold Beauty to manage your appointment. Review Booksy’s privacy information when booking.</p><h2>WhatsApp enquiries</h2><p>The treatment shortlist and enquiry are prepared in your browser. The website does not store or submit these details to a website database. When you choose Enquire on WhatsApp, the details are passed to WhatsApp to prepare a message; you can review and send it there. WhatsApp processes information under its own privacy terms.</p><h2>Contacting Jade</h2><p>If you contact Jade on WhatsApp, Instagram or through Booksy, those services process your message under their own terms and privacy policies. Contact Jade through those channels with questions about your information.</p><h2>Fonts and cookies</h2><p>This website loads fonts from Google Fonts, which involves a request to Google’s servers. This site does not set optional analytics or advertising cookies. Linked services may use their own cookies when you visit them.</p><h2>Your requests</h2><p>To ask about personal information held by Bold Beauty or to make a data request, contact Jade on 07850 411949 or through the WhatsApp, Booksy or Instagram links on this website.</p></article>';
const pages = [
  [
    "",
    "Bold Beauty | Lashes, Brows & Lip Blush in Lowton",
    "Beauty treatments with Jade in Lowton. Explore lashes, brows, lip blush and skin treatments, read client reviews and book through Booksy.",
    home,
  ],
  [
    "treatments",
    "Beauty Treatments in Lowton | Bold Beauty",
    "Explore lash extensions, brows, lip blush, dermaplaning and microneedling at Bold Beauty in Lowton. View current prices and book on Booksy.",
    treatmentsPage,
  ],
  [
    "about",
    "Meet Jade | Bold Beauty Lowton",
    "Meet Jade, the qualified, certified and insured beauty technician behind Bold Beauty in Lowton, with eight years of experience.",
    about,
  ],
  [
    "privacy",
    "Privacy & Cookies | Bold Beauty",
    "How the Bold Beauty website works, appointment booking and privacy information.",
    privacy,
  ],
];
for (const [path, title, desc, content] of pages) {
  const dir = new URL(path ? path + "/" : "", out);
  await mkdir(dir, { recursive: true });
  await writeFile(
    new URL("index.html", dir),
    layout(path ? "/" + path + "/" : "/", title, desc, content),
  );
}
await writeFile(
  new URL("404.html", out),
  layout(
    "/404/",
    "Page not found | Bold Beauty",
    "Find your way back to Bold Beauty.",
    '<section class="section error-page"><p class="eyebrow">404 / Page not found</p><h1>Let’s get you back<br>to feeling bold.</h1><p>This page may have moved, or the link might be incomplete.</p><a class="button" href="/">Back to home ' +
      arrow +
      "</a></section>",
  ),
);
await writeFile(new URL("robots.txt", out), "User-agent: *\nDisallow: /\n");
console.log("Built 4 pages + 404. Preview indexing is disabled.");




