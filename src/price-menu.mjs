import { services, serviceGroups } from "./services.mjs";

const money = (value) => "£" + value;
export function priceMenu() {
  return `
<section class="section price-section" id="prices" aria-labelledby="price-heading">
  <div class="section-heading">
    <div><p class="eyebrow">Make it your appointment</p><h2 id="price-heading">Your treatment menu.</h2></div>
    <p class="price-intro">Explore Jade’s prices and put together an enquiry. Ready to book? Choose your appointment on <a class="inline-link" href="https://boldbeauty95.booksy.com/a/">Booksy</a>.</p>
  </div>
  <div class="price-layout">
    <div class="price-groups">
      ${serviceGroups
        .map(
          (group) => `
      <details class="price-group" id="${group.id}" open>
        <summary>${group.name}</summary>
        <p class="group-note">${group.note}</p>
        <ul class="service-list">
          ${services
            .filter((service) => service.group === group.id)
            .map(
              (service) => `
          <li class="service-row">
            <div><h3>${service.name}</h3>
              ${service.withLashes !== undefined ? `<small>${money(service.withLashes)} with lashes</small>` : ""}
            </div>
            <strong data-price-for="${service.id}">${money(service.price)}</strong>
            <button type="button" class="service-add" data-service-id="${service.id}" aria-pressed="false" aria-label="Add ${service.name} to your enquiry">Add <span aria-hidden="true">+</span></button>
          </li>`,
            )
            .join("")}
        </ul>
      </details>`,
        )
        .join("")}
      <p class="menu-note">Guide prices from Jade’s supplied menu. Confirm your treatment, price and any preparation requirements with Jade or on Booksy before booking.</p>
    </div>
    <aside class="enquiry-panel" aria-labelledby="enquiry-heading">
      <p class="eyebrow">A little help choosing?</p>
      <h3 id="enquiry-heading">Your visit, your way.</h3>
      <p class="enquiry-explainer">Add treatments, then send your enquiry to Jade on WhatsApp.</p>
      <div class="selection-list" data-selection-list><p class="empty-selection">Your selected treatments will appear here.</p></div>
      <div class="selection-total" aria-live="polite" aria-atomic="true">
        <span>Guide total</span><strong data-selection-total>£0</strong>
        <small data-selection-savings hidden></small>
      </div>
      <form data-enquiry-form>
        <label for="enquiry-name">Your name <span>(optional)</span></label>
        <input id="enquiry-name" name="name" autocomplete="given-name" maxlength="80">
        <label for="enquiry-client">Have you visited Jade before?</label>
        <select id="enquiry-client" name="client"><option value="">Choose an option (optional)</option><option>New client</option><option>Returning client</option></select>
        <label for="enquiry-message">Anything you’d like to ask? <span>(optional)</span></label>
        <textarea id="enquiry-message" name="message" rows="3" maxlength="500" placeholder="A treatment question or preferred appointment time"></textarea>
        <button class="button" type="submit" data-enquiry-submit disabled>Enquire on WhatsApp <span aria-hidden="true">↗</span></button>
      </form>
      <p class="enquiry-note">This sends an enquiry, not a confirmed booking. Appointment availability and bookings are confirmed through Booksy.</p>
      <a class="text-link" href="https://wa.me/447850411949">Or message Jade directly <span aria-hidden="true">↗</span></a><br><a class="text-link" href="https://boldbeauty95.booksy.com/a/">Ready to book? Go to Booksy <span aria-hidden="true">↗</span></a>
      <noscript><p>The treatment selector needs JavaScript. You can still <a class="inline-link" href="https://wa.me/447850411949">message Jade on WhatsApp</a> or book through Booksy.</p></noscript>
    </aside>
  </div>
</section>`;
}
