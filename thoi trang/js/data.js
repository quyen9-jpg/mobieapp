// Dữ liệu sản phẩm mẫu cho website thời trang trẻ em (bé trai & bé gái)
const PRODUCTS = [
  {
    id: 1,
    name: "Đầm Công Chúa Voan Hoa Bé Gái",
    category: "vay",
    categoryLabel: "Đầm & Váy Bé Gái",
    price: 320000,
    oldPrice: 400000,
    badge: "Sale",
    icon: "👗",
    tags: "princess,dress,girl",
    sizes: ["2-3 tuổi", "4-5 tuổi", "6-7 tuổi", "8-9 tuổi"],
    colors: ["Hồng", "Trắng"],
    description: "Đầm công chúa voan hoa dịu dàng, chất liệu voan mềm mịn không gây kích ứng da bé, phù hợp dự tiệc và các dịp đặc biệt."
  },
  {
    id: 2,
    name: "Đầm Xòe Tutu Lấp Lánh",
    category: "vay",
    categoryLabel: "Đầm & Váy Bé Gái",
    price: 380000,
    icon: "👗",
    tags: "tutu,dress,girl",
    badge: "Mới",
    sizes: ["2-3 tuổi", "4-5 tuổi", "6-7 tuổi"],
    colors: ["Hồng Pastel", "Tím"],
    description: "Đầm xòe tutu nhiều lớp lưới mềm, đính kim tuyến lấp lánh, giúp bé tự tin tỏa sáng trong các buổi biểu diễn hay sinh nhật."
  },
  {
    id: 3,
    name: "Áo Thun In Hình Khủng Long Bé Trai",
    category: "ao",
    categoryLabel: "Áo",
    price: 150000,
    icon: "👕",
    tags: "dinosaur,tshirt,boy",
    sizes: ["3-4 tuổi", "5-6 tuổi", "7-8 tuổi", "9-10 tuổi"],
    colors: ["Xanh Dương", "Xám"],
    description: "Áo thun cotton in hình khủng long ngộ nghĩnh, chất vải thấm hút mồ hôi tốt, thoải mái cho bé chạy nhảy cả ngày."
  },
  {
    id: 4,
    name: "Áo Sơ Mi Kẻ Caro Bé Trai",
    category: "ao",
    categoryLabel: "Áo",
    price: 220000,
    oldPrice: 260000,
    badge: "Sale",
    icon: "👔",
    tags: "shirt,plaid,boy",
    sizes: ["4-5 tuổi", "6-7 tuổi", "8-9 tuổi", "10-11 tuổi"],
    colors: ["Đỏ Caro", "Xanh Caro"],
    description: "Áo sơ mi kẻ caro dáng lịch sự, chất cotton pha thoáng mát, phù hợp đi học hoặc các dịp lễ cần trang phục chỉn chu."
  },
  {
    id: 5,
    name: "Áo Croptop Hình Unicorn Bé Gái",
    category: "ao",
    categoryLabel: "Áo",
    price: 180000,
    icon: "👚",
    tags: "unicorn,top,girl",
    sizes: ["3-4 tuổi", "5-6 tuổi", "7-8 tuổi"],
    colors: ["Hồng", "Tím Pastel"],
    description: "Áo croptop hình kỳ lân nhiều màu sắc, chất liệu cotton co giãn nhẹ, đáng yêu và dễ phối cùng chân váy hay quần legging."
  },
  {
    id: 6,
    name: "Áo Len Cổ Lọ Họa Tiết Gấu",
    category: "ao",
    categoryLabel: "Áo",
    price: 250000,
    icon: "🧥",
    tags: "sweater,bear,kids",
    sizes: ["2-3 tuổi", "4-5 tuổi", "6-7 tuổi", "8-9 tuổi"],
    colors: ["Kem", "Nâu"],
    description: "Áo len cổ lọ họa tiết gấu đáng yêu, giữ ấm tốt cho mùa thu đông, phù hợp cho cả bé trai và bé gái."
  },
  {
    id: 7,
    name: "Quần Short Kaki Bé Trai",
    category: "quan",
    categoryLabel: "Quần",
    price: 160000,
    icon: "🩳",
    tags: "shorts,khaki,boy",
    sizes: ["3-4 tuổi", "5-6 tuổi", "7-8 tuổi", "9-10 tuổi"],
    colors: ["Be", "Xanh Rêu"],
    description: "Quần short kaki năng động, chất vải dày dặn bền màu, thoải mái vận động cho các bé hiếu động."
  },
  {
    id: 8,
    name: "Quần Jeans Lửng Bé Gái",
    category: "quan",
    categoryLabel: "Quần",
    price: 210000,
    oldPrice: 250000,
    badge: "Sale",
    icon: "👖",
    tags: "jeans,girl",
    sizes: ["4-5 tuổi", "6-7 tuổi", "8-9 tuổi"],
    colors: ["Xanh Nhạt", "Xanh Đậm"],
    description: "Quần jeans lửng form dáng năng động, chất denim co giãn nhẹ giúp bé thoải mái vui chơi mà vẫn thời trang."
  },
  {
    id: 9,
    name: "Quần Legging Họa Tiết Hoa",
    category: "quan",
    categoryLabel: "Quần",
    price: 130000,
    icon: "👖",
    tags: "legging,girl,floral",
    sizes: ["2-3 tuổi", "4-5 tuổi", "6-7 tuổi"],
    colors: ["Hồng Hoa", "Trắng Hoa"],
    description: "Quần legging họa tiết hoa nhí mềm mại co giãn 4 chiều, dễ mặc dễ phối, lý tưởng cho bé vận động cả ngày."
  },
  {
    id: 10,
    name: "Quần Jogger Thể Thao Bé Trai",
    category: "quan",
    categoryLabel: "Quần",
    price: 190000,
    icon: "👖",
    tags: "jogger,sport,boy",
    sizes: ["5-6 tuổi", "7-8 tuổi", "9-10 tuổi", "11-12 tuổi"],
    colors: ["Xám", "Đen"],
    description: "Quần jogger thể thao bo gấu năng động, chất nỉ mềm giữ form tốt, phù hợp đi học và vui chơi ngoài trời."
  },
  {
    id: 11,
    name: "Chân Váy Xếp Ly Bé Gái",
    category: "vay",
    categoryLabel: "Đầm & Váy Bé Gái",
    price: 200000,
    icon: "👗",
    tags: "skirt,girl",
    sizes: ["3-4 tuổi", "5-6 tuổi", "7-8 tuổi"],
    colors: ["Đỏ", "Hồng"],
    description: "Chân váy xếp ly nhẹ nhàng, chuyển động uyển chuyển theo bước chân bé, phù hợp đi học và dạo phố cuối tuần."
  },
  {
    id: 12,
    name: "Bộ Đồ Siêu Nhân Bé Trai",
    category: "bo-do",
    categoryLabel: "Bộ Đồ",
    price: 280000,
    badge: "Mới",
    icon: "🦸",
    tags: "superhero,set,boy",
    sizes: ["3-4 tuổi", "5-6 tuổi", "7-8 tuổi"],
    colors: ["Xanh Dương", "Đỏ"],
    description: "Bộ đồ hóa trang siêu nhân đầy màu sắc, kích thích trí tưởng tượng của bé, chất vải mềm an toàn cho da nhạy cảm."
  },
  {
    id: 13,
    name: "Bộ Váy Yếm Bé Gái",
    category: "bo-do",
    categoryLabel: "Bộ Đồ",
    price: 260000,
    icon: "👗",
    tags: "overall,dress,girl",
    sizes: ["2-3 tuổi", "4-5 tuổi", "6-7 tuổi"],
    colors: ["Vàng", "Hồng"],
    description: "Bộ váy yếm kèm áo thun bên trong, phối màu tươi sáng, dễ mặc dễ thay, thích hợp cho các chuyến dã ngoại cùng gia đình."
  },
  {
    id: 14,
    name: "Bộ Pyjama In Hình Khủng Long",
    category: "bo-do",
    categoryLabel: "Bộ Đồ",
    price: 210000,
    icon: "🌙",
    tags: "pajama,kids",
    sizes: ["3-4 tuổi", "5-6 tuổi", "7-8 tuổi", "9-10 tuổi"],
    colors: ["Xanh", "Xám"],
    description: "Bộ đồ ngủ pyjama cotton mềm mịn in hình ngộ nghĩnh, thấm hút mồ hôi tốt, giúp bé ngủ ngon suốt đêm."
  },
  {
    id: 15,
    name: "Mũ Lưỡi Trai Cho Bé",
    category: "phu-kien",
    categoryLabel: "Phụ Kiện",
    price: 90000,
    icon: "🧢",
    tags: "cap,kids",
    sizes: ["Free Size"],
    colors: ["Xanh", "Đỏ"],
    description: "Mũ lưỡi trai vải cotton nhẹ, có dây điều chỉnh sau gáy, che nắng tốt cho bé khi ra ngoài vui chơi."
  },
  {
    id: 16,
    name: "Balo Hình Thú Cho Bé",
    category: "phu-kien",
    categoryLabel: "Phụ Kiện",
    price: 250000,
    badge: "Mới",
    icon: "🎒",
    tags: "backpack,animal,kids",
    sizes: ["Free Size"],
    colors: ["Hồng", "Xanh"],
    description: "Balo hình thú đáng yêu, ngăn chứa rộng rãi vừa vặn cho bé đi học hoặc đi chơi xa, quai đeo êm không gây mỏi vai."
  }
];

const CATEGORIES = [
  { key: "vay", label: "Đầm & Váy Bé Gái", icon: "👗" },
  { key: "ao", label: "Áo", icon: "👕" },
  { key: "quan", label: "Quần", icon: "👖" },
  { key: "bo-do", label: "Bộ Đồ", icon: "🧸" },
  { key: "phu-kien", label: "Phụ Kiện", icon: "🎒" }
];

// Bộ sưu tập nổi bật hiển thị ở trang chủ
const COLLECTIONS = [
  {
    key: "he-nang-dong",
    tag: "Mới nhất",
    season: "Hè 2026",
    title: "Rong Chơi Mùa Hè",
    icon: "☀️",
    photoTags: "kids,summer",
    link: "shop.html?cat=ao"
  },
  {
    key: "be-gai-cong-chua",
    tag: "Bestseller",
    season: "Bộ Sưu Tập Bé Gái",
    title: "Công Chúa Nhỏ",
    icon: "👑",
    photoTags: "girl,kids,fashion",
    link: "shop.html?cat=vay"
  },
  {
    key: "be-trai-nang-dong",
    tag: "Giới hạn",
    season: "Bộ Sưu Tập Bé Trai",
    title: "Chàng Trai Năng Động",
    icon: "⚽",
    photoTags: "boy,kids,fashion",
    link: "shop.html?cat=quan"
  }
];

// Lớp gradient dùng thay cho ảnh, xoay vòng theo id để mỗi sản phẩm có sắc thái riêng
function gradClass(id) {
  return `grad-${(Number(id) % 4) + 1}`;
}

function formatPrice(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}
