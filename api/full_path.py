import os # type: ignore

# Mevcut çalışma dizinini al
current_dir = os.getcwd()

# Dosya adını belirtin
file_name = "question8.png"

# Tam yolu oluştur
full_path = os.path.join(current_dir, file_name)

print(full_path)