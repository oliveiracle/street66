#!/usr/bin/env python3
"""
Script para otimizar imagens da galeria do Street 66 Bar
Redimensiona para 1200px de largura e comprime para WebP
"""

import os
from PIL import Image
from pathlib import Path

# Configurações
INPUT_DIR = "assets/images/gallery"
OUTPUT_DIR = "assets/images/gallery_optimized"
MAX_WIDTH = 1200
QUALITY = 85

def optimize_image(input_path, output_path):
    """Otimiza uma imagem: redimensiona e converte para WebP"""
    try:
        # Abre a imagem
        img = Image.open(input_path)
        
        # Converte RGBA para RGB se necessário
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        
        # Redimensiona mantendo proporção
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
        
        # Salva como WebP com compressão
        img.save(output_path, 'WEBP', quality=QUALITY, method=6)
        
        # Calcula redução de tamanho
        original_size = os.path.getsize(input_path) / 1024  # KB
        new_size = os.path.getsize(output_path) / 1024  # KB
        reduction = ((original_size - new_size) / original_size) * 100
        
        return original_size, new_size, reduction
        
    except Exception as e:
        print(f"❌ Erro ao processar {input_path}: {e}")
        return None, None, None

def main():
    print("🚀 OTIMIZAÇÃO DE IMAGENS - STREET 66 BAR")
    print("=" * 60)
    
    # Cria pasta de saída
    output_path = Path(OUTPUT_DIR)
    output_path.mkdir(parents=True, exist_ok=True)
    print(f"📁 Pasta de saída: {OUTPUT_DIR}")
    
    # Lista todas as imagens
    input_path = Path(INPUT_DIR)
    image_extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']
    images = [f for f in input_path.iterdir() if f.suffix in image_extensions]
    
    if not images:
        print(f"❌ Nenhuma imagem encontrada em {INPUT_DIR}")
        return
    
    print(f"📸 Encontradas {len(images)} imagens para otimizar")
    print("=" * 60)
    
    total_original = 0
    total_new = 0
    processed = 0
    
    # Processa cada imagem
    for i, img_file in enumerate(images, 1):
        filename = img_file.stem
        output_file = output_path / f"{filename}.webp"
        
        print(f"\n[{i}/{len(images)}] Processando: {img_file.name}")
        
        original_size, new_size, reduction = optimize_image(img_file, output_file)
        
        if original_size:
            total_original += original_size
            total_new += new_size
            processed += 1
            print(f"   ✅ {original_size:.1f}KB → {new_size:.1f}KB (↓{reduction:.1f}%)")
        
    # Resumo final
    print("\n" + "=" * 60)
    print("📊 RESUMO DA OTIMIZAÇÃO")
    print("=" * 60)
    print(f"✅ Imagens processadas: {processed}/{len(images)}")
    print(f"📉 Tamanho original: {total_original/1024:.1f} MB")
    print(f"📦 Tamanho otimizado: {total_new/1024:.1f} MB")
    print(f"💾 Economia total: {((total_original - total_new)/1024):.1f} MB ({((total_original - total_new)/total_original)*100:.1f}%)")
    print(f"\n🎉 Imagens otimizadas salvas em: {OUTPUT_DIR}/")
    print("\n⚡ Próximo passo: Atualizar gallery.html para usar as imagens .webp")

if __name__ == "__main__":
    main()
