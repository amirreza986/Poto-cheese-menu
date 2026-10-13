# =====================================================
# تبدیل دسته‌جمعی عکس‌ها به WebP برای سرعت بیشتر
# =====================================================
import os
import re
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(ROOT, "images")
MENU = os.path.join(ROOT, "js", "menu-data.js")

MAX_W = 1200
QUALITY = 82

converted = 0

for dirpath, _, filenames in os.walk(IMG_DIR):
    # به لوگوها دست نزن (index.html مستقیم به آنها اشاره می‌کند)
    if "brand" in dirpath.split(os.sep):
        continue

    for fn in filenames:
        low = fn.lower()
        if not low.endswith((".png", ".jpg", ".jpeg")):
            continue

        src = os.path.join(dirpath, fn)
        dst = os.path.splitext(src)[0] + ".webp"

        try:
            im = Image.open(src)

            # کوچک‌سازی اگر عرض زیاد بود
            if im.width > MAX_W:
                ratio = MAX_W / im.width
                im = im.resize((MAX_W, int(im.height * ratio)), Image.LANCZOS)

            # حفظ شفافیت برای آیکون‌ها
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
            else:
                im = im.convert("RGB")

            im.save(dst, "WEBP", quality=QUALITY, method=6)
            os.remove(src)
            converted += 1
            print("converted:", os.path.relpath(dst, ROOT))
        except Exception as e:
            print("SKIP:", src, "->", e)

# بازنویسی مسیرها در menu-data.js
with open(MENU, "r", encoding="utf-8") as f:
    text = f.read()

new_text = re.sub(r'(images/[^"\'\s]+?)\.(?:png|jpe?g)', r'\1.webp', text)

with open(MENU, "w", encoding="utf-8") as f:
    f.write(new_text)

print("DONE. converted", converted, "images.")