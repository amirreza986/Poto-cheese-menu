import qrcode

# 1. شماره کارت خود را اینجا وارد کنید (بدون فاصله برای کپی آسان‌تر)
card_number = "6037991738934797"  # <-- شماره کارت واقعی خود را جایگزین کنید

# 2. تنظیمات ساخت QR کد برای خوانایی بهتر
qr = qrcode.QRCode(
    version=1,          # اندازه خودکار بر اساس داده
    error_correction=qrcode.constants.ERROR_CORRECT_H, # خطایابی بالا برای اسکن راحت‌تر
    box_size=10,        # اندازه هر خانه
    border=4,           # حاشیه اطراف کد
)

# 3. افزودن شماره کارت به QR کد
qr.add_data(card_number)
qr.make(fit=True)

# 4. ساخت تصویر با رنگ‌های واضح (پیشنهاد: مشکی روی سفید برای بهترین اسکن)
img = qr.make_image(fill_color="black", back_color="white")

# 5. ذخیره تصویر در همان پوشه
file_name = "bank_card_qr.png"
img.save(file_name)

print(f"✅ QR کد با موفقیت ساخته شد و در فایل '{file_name}' ذخیره گردید.")