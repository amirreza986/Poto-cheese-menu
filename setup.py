#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
اسکریپت ساخت ساختار اولیه پروژه منوی رستوران
این اسکریپت فقط پوشه‌ها و فایل‌هایی را می‌سازد که وجود ندارند.
فایل‌های موجود پاک یا بازنویسی نمی‌شوند.
"""

import os
from pathlib import Path


# پوشه‌هایی که باید ساخته شوند
FOLDERS = [
    "css",
    "js",
    "images",
    "images/appetizer",
    "images/main",
    "images/drink",
    "images/dessert",
    "backup",
    "tools",
]


# فایل‌هایی که باید ساخته شوند
FILES = [
    "index.html",
    "css/style.css",
    "js/main.js",
    "README.md",
    ".gitignore",
    "robots.txt",
]


# محتوای اولیه فایل‌هایی که اگر وجود نداشتند ساخته شوند
FILE_CONTENTS = {
    "css/style.css": """/* فایل استایل اصلی سایت */
""",

    "js/main.js": """// فایل جاوااسکریپت اصلی سایت
""",

    "README.md": """# منوی رستوران کوچک

وب‌سایت منوی آنلاین رستوران برای نمایش به مشتریان از طریق QR Code.

## ساختار پروژه

- `index.html` : صفحه اصلی سایت
- `css/` : فایل‌های استایل
- `js/` : فایل‌های جاوااسکریپت
- `images/` : تصاویر غذاها و رستوران
- `backup/` : نسخه‌های پشتیبان
- `tools/` : اسکریپت‌ها و ابزارها

## اجرای محلی

فایل `index.html` را مستقیم در مرورگر باز کنید.
""",

    ".gitignore": """# فایل‌ها و پوشه‌هایی که نباید وارد Git شوند

.DS_Store
Thumbs.db
desktop.ini

# اگر بعداً پوشه محیط مجازی پایتون ساختیم
venv/
env/
.venv/

# لاگ‌ها و فایل‌های موقت
*.log
*.tmp
""",

    "robots.txt": """User-agent: *
Allow: /
""",
}


def create_folder(folder_path):
    path = Path(folder_path)
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)
        return True
    return False


def create_file(file_path):
    path = Path(file_path)

    if path.exists():
        return False

    # اگر پوشه والد وجود ندارد، اول آن را بساز
    path.parent.mkdir(parents=True, exist_ok=True)

    content = FILE_CONTENTS.get(str(file_path).replace("\\", "/"), "")

    path.write_text(content, encoding="utf-8")
    return True


def print_tree(start_path="."):
    print("\nساختار فعلی پروژه:")
    print("=" * 50)

    ignore_names = {
        ".git",
        ".vscode",
        "__pycache__",
        "node_modules",
    }

    for root, dirs, files in os.walk(start_path):
        dirs[:] = [
            d
            for d in dirs
            if d not in ignore_names and not d.startswith(".")
        ]

        dirs.sort()
        files.sort()

        level = Path(root).relative_to(start_path).parts
        indent = "  " * len(level)

        folder_name = Path(root).name
        if root == ".":
            folder_name = Path.cwd().name

        print(f"{indent}📁 {folder_name}/")

        sub_indent = "  " * (len(level) + 1)

        for file in files:
            print(f"{sub_indent}📄 {file}")


def main():
    print("در حال ساخت ساختار پروژه...")
    print("=" * 50)

    created_folders = []
    skipped_folders = []

    created_files = []
    skipped_files = []

    # ساخت پوشه‌ها
    for folder in FOLDERS:
        if create_folder(folder):
            created_folders.append(folder)
        else:
            skipped_folders.append(folder)

    # ساخت فایل‌ها
    for file in FILES:
        if create_file(file):
            created_files.append(file)
        else:
            skipped_files.append(file)

    # نمایش نتیجه
    print("\n✅ ساخت پوشه‌ها:")
    if created_folders:
        for folder in created_folders:
            print(f"  + {folder}")
    else:
        print("  همه پوشه‌ها از قبل وجود داشتند.")

    if skipped_folders:
        print("\n⏭️ پوشه‌های موجود:")
        for folder in skipped_folders:
            print(f"  - {folder}")

    print("\n✅ ساخت فایل‌ها:")
    if created_files:
        for file in created_files:
            print(f"  + {file}")
    else:
        print("  همه فایل‌ها از قبل وجود داشتند.")

    if skipped_files:
        print("\n⏭️ فایل‌های موجود:")
        for file in skipped_files:
            print(f"  - {file}")

    print_tree(".")

    print("\n✅ پایان. ساختار پروژه آماده است.")


if __name__ == "__main__":
    main()