const tbody = document.getElementById("reservations");

function loadReservations() {
  tbody.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("rental_")) {
      const carName = key.replace("rental_", "");
      const endDate = localStorage.getItem(key);

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${carName}</td>
        <td>${endDate}</td>
        <td>
          <button onclick="removeReservation('${key}')">
            ❌ حذف
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    }
  }
}

function removeReservation(key) {
  if (confirm("واش متأكد باغي تحذف هاد الحجز؟")) {
    localStorage.removeItem(key);
    loadReservations();
  }
}

loadReservations();
