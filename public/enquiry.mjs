import { calculateSelection } from "./pricing.mjs";

const root = document.querySelector(".price-section");
if (root) {
  try {
    const catalogue = JSON.parse(
      document.querySelector("#service-catalogue").textContent,
    );
    const selected = new Set();
    const list = root.querySelector("[data-selection-list]");
    const total = root.querySelector("[data-selection-total]");
    const savings = root.querySelector("[data-selection-savings]");
    const form = root.querySelector("[data-enquiry-form]");
    const money = (value) => "£" + value;
    const result = () => calculateSelection(catalogue, selected);

    function render() {
      const selection = result();
      list.replaceChildren();
      if (!selection.items.length) {
        const empty = document.createElement("p");
        empty.className = "empty-selection";
        empty.textContent = "Your selected treatments will appear here.";
        list.append(empty);
      }
      for (const item of selection.items) {
        const row = document.createElement("div");
        row.className = "selection-row";
        const label = document.createElement("span");
        label.textContent = item.name;
        const price = document.createElement("strong");
        price.textContent = money(item.effectivePrice);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.setAttribute("aria-label", "Remove " + item.name);
        remove.addEventListener("click", () => {
          selected.delete(item.id);
          render();
          root.querySelector('[data-service-id="' + item.id + '"]').focus();
        });
        row.append(label, price, remove);
        list.append(row);
      }
      total.textContent = money(selection.total);
      savings.hidden = !selection.savings;
      savings.textContent = selection.savings
        ? "Includes " + money(selection.savings) + " in lash add-on savings."
        : "";
      for (const button of root.querySelectorAll("[data-service-id]")) {
        const active = selected.has(button.dataset.serviceId);
        button.setAttribute("aria-pressed", String(active));
        button.textContent = active ? "Added ✓" : "Add +";
        const item = catalogue.find(
          (service) => service.id === button.dataset.serviceId,
        );
        button.setAttribute(
          "aria-label",
          (active ? "Remove " : "Add ") +
            item.name +
            (active ? " from" : " to") +
            " your enquiry",
        );
      }
      const hasLashes = selection.items.some((item) => item.lashes);
      for (const service of catalogue) {
        const label = root.querySelector(
          '[data-price-for="' + service.id + '"]',
        );
        const price =
          hasLashes && service.withLashes !== undefined
            ? service.withLashes
            : service.price;
        if (label) label.textContent = money(price);
      }
    }

    root.querySelectorAll("[data-service-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.serviceId;
        selected.has(id) ? selected.delete(id) : selected.add(id);
        render();
      });
    });
    root.querySelector("[data-enquiry-submit]").disabled = false;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = new FormData(form);
      const selection = result();
      const name = String(fields.get("name") || "").trim();
      const message = [
        name
          ? "Hi Jade, it’s " + name + "."
          : "Hi Jade, I’d like to enquire about an appointment.",
      ];
      if (fields.get("client"))
        message.push(String(fields.get("client")) + ".");
      if (selection.items.length) {
        message.push("", "Treatments I’m interested in:");
        selection.items.forEach((item) =>
          message.push("• " + item.name + ": " + money(item.effectivePrice)),
        );
        message.push("Guide total: " + money(selection.total));
        if (selection.savings)
          message.push(
            "Includes " + money(selection.savings) + " in lash add-on savings.",
          );
        if (selection.items.some((item) => item.model))
          message.push(
            "Please confirm model appointment availability and any photography or top-up requirements.",
          );
      }
      const note = String(fields.get("message") || "").trim();
      if (note) message.push("", note);
      message.push(
        "",
        "Please confirm the treatment, final price and availability. I understand this is an enquiry and I’ll confirm the appointment through Booksy.",
      );
      const url = new URL("https://wa.me/447850411949");
      url.searchParams.set("text", message.join("\n"));
      window.location.assign(url.href);
    });
  } catch {
    // Keep the published prices and direct booking/contact links usable if enhancement fails.
  }
}
