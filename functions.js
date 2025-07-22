function loadStyledBox(targetId = null, colorName = "success", text) {

  const colorMap = {
    green: "#198754",
    orange: "#fd7e14",
    red: "#dc3545",
    blue: "#0dcaf0",
    yellow: "#ffc107",
    grey: "#6c757d"
  };

  const hexColor = colorMap[colorName] || colorMap["secondary"];

  // Hilfsfunktion: Hex zu RGBA konvertieren
  function hexToRGBA(hex, alpha = 1) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const box = document.createElement('div');
  box.style.border = `1px solid ${hexColor}`;
  box.style.backgroundColor = hexToRGBA(hexColor, 0.05);
  box.style.padding = "0.5rem";
  box.style.borderRadius = "0.5rem";
  box.style.marginTop = "1.5rem";
  box.style.marginBottom = "1.5rem";

  const heading = document.createElement('h6');
  heading.style.color = hexColor;
  heading.innerHTML = text;
  box.appendChild(heading);

  const target = document.getElementById(targetId);
  if (target) {
    target.appendChild(box);
    target.appendChild(moreSpace);
  }
}
