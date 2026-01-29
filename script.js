function reserve(name, price, startId, endId) {
  const start = document.getElementById(startId).value;
  const end = document.getElementById(endId).value;

  if (!start || !end) {
    alert("عفاك دخل التاريخ");
    return;
  }

  const d1 = new Date(start);
  const d2 = new Date(end);
  const days = (d2 - d1) / (1000 * 60 * 60 * 24) + 1;

  if (days <= 0) {
    alert("التاريخ غير صحيح");
    return;
  }

  const total = days * price;

  localStorage.setItem("rental_" + name,end);

  const message = `
سلام، بغيت نحجز:
🚗 السيارة: ${name}
📅 من: ${start}
📅 إلى: ${end}
⏱️ عدد الأيام: ${days}
💰 الثمن: ${total} درهم
`;

  const phone = "212702600614"; // بدّل رقمك
  const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");

  location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
  const cars = document.querySelectorAll(".car");
  const today = new Date();

  cars.forEach(car => {
    const name = car.dataset.car;
    const endDate = localStorage.getItem("rental_" + name);

    if (endDate) {
      const end = new Date(endDate);

      // إلا مازال الكراء ما سالاش ➜ خبّي السيارة
      if (end >= today) {
        car.style.display = "none";
      } else {
        // إلا سالا ➜ مسحو من التخزين
        localStorage.removeItem("rental_" + name);
      }
    }
  });
});

