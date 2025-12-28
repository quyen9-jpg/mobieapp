const items = document.querySelectorAll('.item');

items.forEach((item, index) => {
  setTimeout(() => {
    item.classList.add('fade-in');
  }, index * 200); // Hiển thị từng icon cách nhau 0.2 giây
});