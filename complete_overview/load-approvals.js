document.addEventListener("DOMContentLoaded", () => {

  fetch("all_approvals_structured.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("mapping");

      data.forEach(entry => {
        const row = document.createElement("div");
        row.className = "mapping-row";

        // MLU Modul
        const mluBlock = createModuleBlock(entry.mlu, true);
        mluBlock.classList.add("mlu-block");

        // Pfeil
        const arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.innerText = "←";

        // Quellmodule
        const sourcesRow = document.createElement("div");
        sourcesRow.style.display = "flex";
        sourcesRow.style.flexDirection = "row";
        sourcesRow.style.flexWrap = "wrap";
        sourcesRow.style.gap = "10px";

        entry.quelle.forEach(modul => {
          const sourceBlock = createModuleBlock(modul);
          sourceBlock.classList.add("bht-tub-block");
          sourcesRow.appendChild(sourceBlock);
        });

        row.appendChild(mluBlock);
        row.appendChild(arrow);
        row.appendChild(sourcesRow);
        container.appendChild(row);
      });
    });

  function createModuleBlock(modul, isMlu = false) {
    const block = document.createElement("div");
    block.classList.add("module-block");
    block.classList.add(`color-${modul.color.toLowerCase()}`);

    const title = document.createElement("div");
    title.className = "module-title";
    title.innerText = modul.titel;

    const lp = document.createElement("div");
    lp.className = "lp-circle";
    lp.innerText = modul.lp;

    block.appendChild(title);
    block.appendChild(lp);

    if (isMlu) {
      block.classList.add("mlu-block");
    }

    if (isMlu && modul.link) {
      const wrapper = document.createElement("a");
      wrapper.href = modul.link;
      wrapper.rel = "noopener noreferrer";
      wrapper.classList.add("module-link");
      wrapper.appendChild(block);
      return wrapper;
    }

    return block;
  }

});
