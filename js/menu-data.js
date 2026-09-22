/* =====================================================
   فایل داده‌های منوی POTO CHEESE
   ===================================================== */

const config = {
  restaurantNameEn: "POTO CHEESE",
  brandSub: "FAST FOOD & CHEESE",
  taglineEn: "Crispy & Cheesy",
  heroLine1: "Crispy Flavor,",
  heroLine2: "Delivered Fast",
  heroSub: "POTO CHEESE · FAST FOOD & CHEESE",
  phoneDisplay: "۰۹۰۰۰۰۰۰",
  phoneTel: "09120000000",
  address: "آدرس رستوران: تهران، خیابان نمونه، پلاک ۱",
  hours: "ساعت کاری: ۱۲ تا ۲۳",
  currency: "تومان"
};

const categories = [
  { id: "fried-chicken", labelFa: "مرغ سوخاری", labelEn: "Fried Chicken", emoji: "🍗" },
  { id: "burgers", labelFa: "برگرها", labelEn: "Burgers", emoji: "🍔" },
  { id: "wraps", labelFa: "رپ‌ها", labelEn: "Wraps", emoji: "🌯" },
  { id: "sides", labelFa: "کنار غذا", labelEn: "Sides", emoji: "🍟" },
  { id: "drinks", labelFa: "نوشیدنی‌ها", labelEn: "Drinks", emoji: "🥤" },
  { id: "desserts", labelFa: "دسرها", labelEn: "Desserts", emoji: "🍰" }
];

const items = [
  {
    id: 1,
    category: "fried-chicken",
    titleFa: "مرغ سوخاری کریسپی",
    titleEn: "Crispy Fried Chicken",
    description: "مرغ تازه با روکش ترد و ادویه مخصوص",
    price: 165000,
    image: "images/fried-chicken/crispy.jpg",
    emoji: "🍗",
    color1: "#1a4433",
    color2: "#2a7a54",
    badges: ["popular"]
  },
  {
    id: 2,
    category: "fried-chicken",
    titleFa: "بال سوخاری تند",
    titleEn: "Spicy Wings",
    description: "بال مرغ سوخاری با سس تند و دودی",
    price: 145000,
    image: "images/fried-chicken/wings.jpg",
    emoji: "🔥",
    color1: "#3a1a10",
    color2: "#7a3a20",
    badges: ["spicy"]
  },
  {
    id: 3,
    category: "burgers",
    titleFa: "برگر مرغ کریسپی",
    titleEn: "Crispy Chicken Burger",
    description: "فیله مرغ سوخاری، کاهو، گوجه و سس مخصوص",
    price: 155000,
    image: "images/burgers/chicken-burger.jpg",
    emoji: "🍔",
    color1: "#3a2a10",
    color2: "#7a5a20",
    badges: ["popular"]
  },
  {
    id: 4,
    category: "burgers",
    titleFa: "دبل چیزبرگر گوشت",
    titleEn: "Double Cheese Burger",
    description: "دو لایه گوشت گریل، پنیر چدار، خیارشور و سس",
    price: 195000,
    image: "images/burgers/double-cheese.jpg",
    emoji: "🧀",
    color1: "#3a3010",
    color2: "#7a6a20",
    badges: []
  },
  {
    id: 5,
    category: "wraps",
    titleFa: "رپ مرغ گریل",
    titleEn: "Grilled Chicken Wrap",
    description: "مرغ گریل شده، سبزیجات تازه و سس سیر در نان تورتیلا",
    price: 135000,
    image: "images/wraps/chicken-wrap.jpg",
    emoji: "🌯",
    color1: "#2a3010",
    color2: "#5a6a20",
    badges: []
  },
  {
    id: 6,
    category: "wraps",
    titleFa: "رپ سزار",
    titleEn: "Caesar Wrap",
    description: "مرغ، کاهو، پنیر پارمزان و سس سزار در نان تورتیلا",
    price: 140000,
    image: "images/wraps/caesar-wrap.jpg",
    emoji: "🥬",
    color1: "#1a3020",
    color2: "#3a6a40",
    badges: ["new"]
  },
  {
    id: 7,
    category: "sides",
    titleFa: "سیب‌زمینی سرخ‌کرده",
    titleEn: "French Fries",
    description: "سیب‌زمینی ترد با نمک دریایی و سس کچاپ",
    price: 65000,
    image: "images/sides/fries.jpg",
    emoji: "🍟",
    color1: "#3a3010",
    color2: "#7a6a20",
    badges: ["veg"]
  },
  {
    id: 8,
    category: "sides",
    titleFa: "حلقه پیاز سوخاری",
    titleEn: "Onion Rings",
    description: "حلقه‌های پیاز با روکش ترد طلایی",
    price: 70000,
    image: "images/sides/onion-rings.jpg",
    emoji: "🧅",
    color1: "#3a2a20",
    color2: "#7a5a40",
    badges: ["veg"]
  },
  {
    id: 9,
    category: "drinks",
    titleFa: "نوشابه گازدار",
    titleEn: "Soft Drink",
    description: "نوشابه خنک در طعم‌های مختلف",
    price: 25000,
    image: "images/drinks/soft-drink.jpg",
    emoji: "🥤",
    color1: "#102030",
    color2: "#204060",
    badges: ["veg"]
  },
  {
    id: 10,
    category: "drinks",
    titleFa: "میلک‌شیک",
    titleEn: "Milkshake",
    description: "میلک‌شیک غلیظ با طعم شکلات، توت‌فرنگی یا وانیل",
    price: 85000,
    image: "images/drinks/milkshake.jpg",
    emoji: "🥛",
    color1: "#302030",
    color2: "#604060",
    badges: ["veg", "new"]
  },
  {
    id: 11,
    category: "desserts",
    titleFa: "براونی شکلاتی",
    titleEn: "Chocolate Brownie",
    description: "براونی گرم با مغز شکلاتی و بستنی وانیلی",
    price: 95000,
    image: "images/desserts/brownie.jpg",
    emoji: "🍫",
    color1: "#2a1a10",
    color2: "#5a3a20",
    badges: ["veg", "new"]
  },
  {
    id: 12,
    category: "desserts",
    titleFa: "چیزکیک",
    titleEn: "Cheesecake",
    description: "چیزکیک خامه‌ای با سس توت‌فرنگی",
    price: 105000,
    image: "images/desserts/cheesecake.jpg",
    emoji: "🍰",
    color1: "#302020",
    color2: "#604040",
    badges: ["veg"]
  }
];

const badgeMeta = {
  popular: { label: "پرفروش", class: "" },
  spicy: { label: "تند", class: "spicy" },
  veg: { label: "گیاهی", class: "veg" },
  new: { label: "جدید", class: "new" }
};