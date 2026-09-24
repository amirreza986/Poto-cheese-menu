/* =====================================================
   فایل داده‌های منوی POTO CHEESE
   (تولید شده توسط پنل مدیریت — دستی ویرایش نکنید)
   ===================================================== */

const config = {
  "restaurantNameFa": "پوتو چیز",
  "restaurantNameEn": "POTO CHEESE",
  "taglineEn": "Good Food Good Mood",
  "heroLine1": "Good Food,",
  "heroLine2": "Good Mood",
  "heroSub": "POTO CHEESE · CRISPY & CHEESY",
  "phoneDisplay": "۰۹۳۸۳۱۷۱۴۲۹",
  "phoneTel": "09383171429",
  "whatsapp": "989383171429",
  "address": "فردیس، بلوار شهدا، بین فلکه اول و دوم، خیابان ۱۳ غربی، پلاک ۴",
  "hours": "ساعت کاری: ۱۰ صبح تا ۱۲ شب",
  "currency": "تومان",
  "allIcon": "images/icons/all.png"
};

const categories = [
  {
    "id": "potatoes",
    "labelFa": "پوتو",
    "labelEn": "Poto",
    "emoji": "🥔",
    "icon": "images/icons/poto.png"
  },
  {
    "id": "snacks",
    "labelFa": "اسنک",
    "labelEn": "Snacks",
    "emoji": "🍟",
    "icon": "images/icons/snack.png"
  },
  {
    "id": "special-sauces",
    "labelFa": "سس اسپشیال",
    "labelEn": "Special Sauces",
    "emoji": "🍯",
    "icon": "images/icons/sauce.png"
  },
  {
    "id": "hot-dips",
    "labelFa": "دیپ هات",
    "labelEn": "Hot Dips",
    "emoji": "🫕",
    "icon": "images/icons/dip.png"
  },
  {
    "id": "drinks",
    "labelFa": "نوشیدنی",
    "labelEn": "Drinks",
    "emoji": "🥤",
    "icon": "images/icons/drink.png"
  }
];

const items = [
  {
    "id": 1,
    "category": "potatoes",
    "titleFa": "پوتو قیفی",
    "titleEn": "Poto Ghifi",
    "description": "سیب‌زمینی قیفی با روکش ترد و ادویه مخصوص",
    "price": 235000,
    "image": "images/potatoes/poto-ghifi.jpg",
    "emoji": "🍟",
    "color1": "#3a3010",
    "color2": "#7a6a20",
    "badges": [],
    "available": true
  },
  {
    "id": 2,
    "category": "potatoes",
    "titleFa": "پوتو متری",
    "titleEn": "Poto Metri",
    "description": "سیب‌زمینی متری با سس مخصوص",
    "price": 240000,
    "image": "images/potatoes/poto-metri.jpg",
    "emoji": "🍟",
    "color1": "#3a3010",
    "color2": "#7a6a20",
    "badges": [],
    "available": true
  },
  {
    "id": 3,
    "category": "potatoes",
    "titleFa": "پوتو ساده",
    "titleEn": "Poto Sadeh",
    "description": "سیب‌زمینی ساده با طعم اصیل",
    "price": 270000,
    "image": "images/potatoes/poto-sadeh.jpg",
    "emoji": "🍟",
    "color1": "#3a3010",
    "color2": "#7a6a20",
    "badges": [],
    "available": true
  },
  {
    "id": 4,
    "category": "potatoes",
    "titleFa": "پوتو هات‌داگ",
    "titleEn": "Poto Hotdog",
    "description": "سیب‌زمینی با تکه‌های هات‌داگ",
    "price": 340000,
    "image": "images/potatoes/poto-hotdog.jpg",
    "emoji": "🌭",
    "color1": "#3a2a10",
    "color2": "#7a5a20",
    "badges": [],
    "available": true
  },
  {
    "id": 5,
    "category": "potatoes",
    "titleFa": "پوتو ویژه",
    "titleEn": "Poto Vijeh",
    "description": "پنیر پارمسان رنده شده با سس مخصوص",
    "price": 399000,
    "image": "images/potatoes/poto-vijeh.jpg",
    "emoji": "🧀",
    "color1": "#3a3010",
    "color2": "#7a6a20",
    "badges": [],
    "available": true
  },
  {
    "id": 6,
    "category": "potatoes",
    "titleFa": "پوتو هات اسپشیال",
    "titleEn": "Poto Hot Special",
    "description": "پنیر پارمسان، هات‌داگ و سس مخصوص",
    "price": 465000,
    "image": "images/potatoes/poto-hot-special.jpg",
    "emoji": "🔥",
    "color1": "#3a1a10",
    "color2": "#7a3a20",
    "badges": [],
    "available": true
  },
  {
    "id": 7,
    "category": "snacks",
    "titleFa": "اسنک سوخاری",
    "titleEn": "Crispy Snack",
    "description": "اسنک سوخاری با روکش ترد",
    "price": 225000,
    "image": "images/snacks/snack-sokhari.jpg",
    "emoji": "🍗",
    "color1": "#3a2a10",
    "color2": "#7a5a20",
    "badges": [],
    "available": true
  },
  {
    "id": 8,
    "category": "snacks",
    "titleFa": "اسنک سوخاری تند",
    "titleEn": "Spicy Crispy Snack",
    "description": "اسنک سوخاری با سس تند",
    "price": 225000,
    "image": "images/snacks/snack-tund.jpg",
    "emoji": "🔥",
    "color1": "#3a1a10",
    "color2": "#7a3a20",
    "badges": [
      "spicy"
    ],
    "available": true
  },
  {
    "id": 9,
    "category": "special-sauces",
    "titleFa": "سس فرای (بلژیک)",
    "titleEn": "Fry Sauce (Belgium)",
    "description": "سس کلاسیک بلژیکی",
    "price": 60000,
    "image": "images/sauces/sauce-fry.jpg",
    "emoji": "🍯",
    "color1": "#2a3010",
    "color2": "#5a6a20",
    "badges": [],
    "available": true
  },
  {
    "id": 10,
    "category": "special-sauces",
    "titleFa": "سس آندالوس (اسپانیا)",
    "titleEn": "Andalus Sauce (Spain)",
    "description": "سس محبوب و تند اسپانیایی",
    "price": 60000,
    "image": "images/sauces/sauce-andalus.jpg",
    "emoji": "🌶️",
    "color1": "#3a1a10",
    "color2": "#7a3a20",
    "badges": [
      "spicy"
    ],
    "available": true
  },
  {
    "id": 11,
    "category": "special-sauces",
    "titleFa": "سس گارلیک آیولی (فرانسه)",
    "titleEn": "Garlic Aioli (France)",
    "description": "سس سیری خانه‌ای فرانسوی",
    "price": 60000,
    "image": "images/sauces/sauce-garlic.jpg",
    "emoji": "🧄",
    "color1": "#2a3020",
    "color2": "#5a6a40",
    "badges": [],
    "available": true
  },
  {
    "id": 12,
    "category": "special-sauces",
    "titleFa": "سس جوپی (آرژانتین)",
    "titleEn": "Joopy Sauce (Argentina)",
    "description": "سس کرمی و کمی دودی",
    "price": 60000,
    "image": "images/sauces/sauce-joopy.jpg",
    "emoji": "🥄",
    "color1": "#3a2a20",
    "color2": "#7a5a40",
    "badges": [],
    "available": true
  },
  {
    "id": 13,
    "category": "special-sauces",
    "titleFa": "سس کچاپ",
    "titleEn": "Ketchup",
    "description": "به صورت رایگان همراه سفارش",
    "price": 0,
    "image": "images/sauces/ketchup.jpg",
    "emoji": "🍅",
    "color1": "#3a1010",
    "color2": "#7a2020",
    "badges": [],
    "available": true
  },
  {
    "id": 14,
    "category": "hot-dips",
    "titleFa": "دیپ گودا",
    "titleEn": "Gouda Dip",
    "description": "دیپ پنیر گودا گرم و کشدار",
    "price": 95000,
    "image": "images/sauces/dip-gouda.jpg",
    "emoji": "🧀",
    "color1": "#3a3010",
    "color2": "#7a6a20",
    "badges": [],
    "available": true
  },
  {
    "id": 15,
    "category": "hot-dips",
    "titleFa": "دیپ قارچ و خامه",
    "titleEn": "Mushroom Cream Dip",
    "description": "دیپ قارچ و خامه گرم",
    "price": 95000,
    "image": "images/sauces/dip-mushroom.jpg",
    "emoji": "🍄",
    "color1": "#2a2a20",
    "color2": "#5a5a40",
    "badges": [],
    "available": true
  },
  {
    "id": 16,
    "category": "drinks",
    "titleFa": "نوشابه زیرو",
    "titleEn": "Zero",
    "description": "نوشابه گازدار بدون قند",
    "price": 94000,
    "image": "images/drinks/zero.jpg",
    "emoji": "🥤",
    "color1": "#102030",
    "color2": "#204060",
    "badges": [],
    "available": true
  },
  {
    "id": 17,
    "category": "drinks",
    "titleFa": "کوکاکولا",
    "titleEn": "Coca-Cola",
    "description": "نوشابه گازدار کلاسیک",
    "price": 94000,
    "image": "images/drinks/coca.jpg",
    "emoji": "🥤",
    "color1": "#3a1010",
    "color2": "#7a2020",
    "badges": [],
    "available": true
  },
  {
    "id": 18,
    "category": "drinks",
    "titleFa": "فانتا",
    "titleEn": "Fanta",
    "description": "نوشابه گازدار پرتقالی",
    "price": 94000,
    "image": "images/drinks/fanta.jpg",
    "emoji": "🥤",
    "color1": "#3a2a10",
    "color2": "#7a5a20",
    "badges": [],
    "available": true
  },
  {
    "id": 19,
    "category": "drinks",
    "titleFa": "اسپرایت",
    "titleEn": "Sprite",
    "description": "نوشابه گازدار لیمویی",
    "price": 94000,
    "image": "images/drinks/sprite.jpg",
    "emoji": "🥤",
    "color1": "#1a3020",
    "color2": "#3a6a40",
    "badges": [],
    "available": true
  },
  {
    "id": 20,
    "category": "drinks",
    "titleFa": "دوغ بطری عالیس",
    "titleEn": "Alis Doogh",
    "description": "دوغ محلی عالیس",
    "price": 70000,
    "image": "images/drinks/doogh.jpg",
    "emoji": "🥛",
    "color1": "#f0f9ff",
    "color2": "#bae6fd",
    "badges": [],
    "available": true
  },
  {
    "id": 21,
    "category": "drinks",
    "titleFa": "آب معدنی",
    "titleEn": "Mineral Water",
    "description": "آب معدنی خالص",
    "price": 20000,
    "image": "images/drinks/ab-madani.jpg",
    "emoji": "💧",
    "color1": "#1a3030",
    "color2": "#3a6a6a",
    "badges": [],
    "available": true
  },
  {
    "id": 22,
    "category": "drinks",
    "titleFa": "آب سودا",
    "titleEn": "Soda Water",
    "description": "آب گازدار",
    "price": 75000,
    "image": "images/drinks/ab-soda.jpg",
    "emoji": "🫧",
    "color1": "#203040",
    "color2": "#406080",
    "badges": [],
    "available": true
  }
];

const badgeMeta = {
  "spicy": {
    "label": "تند",
    "class": "spicy"
  }
};
