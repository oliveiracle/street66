#!/usr/bin/env python3
"""
Script para rotacionar imagens de cocktails que estão na orientação errada
"""

from PIL import Image
from pathlib import Path


def rotate_image(image_path, degrees=90):
    """
    Rotaciona uma imagem no sentido anti-horário
    
    Args:
        image_path: Caminho da imagem
        degrees: Graus de rotação (90, 180, 270)
    """
    try:
        img = Image.open(image_path)
        
        # Rotaciona a imagem (anti-horário)
        # Para deixar em pé, usamos 270 graus (ou -90)
        rotated = img.rotate(-degrees, expand=True)
        
        # Salva a imagem rotacionada
        rotated.save(image_path, 'WEBP', quality=85, method=6)
        print(f"✓ Rotacionado {degrees}°: {image_path.name}")
        return True
        
    except Exception as e:
        print(f"✗ Erro ao processar {image_path}: {e}")
        return False


def main():
    # Diretório de cocktails
    cocktails_dir = Path("assets/images/backgrounds/cocktails")
    
    if not cocktails_dir.exists():
        print(f"Erro: Diretório {cocktails_dir} não encontrado!")
        return
    
    print("🔄 Rotacionando imagens de cocktails para posição vertical...\n")
    
    # Lista das novas fotos de cocktails
    new_images = sorted([
        f for f in cocktails_dir.iterdir()
        if f.is_file() and f.name.startswith('20251105_') and f.suffix == '.webp'
    ])
    
    if not new_images:
        print("Nenhuma imagem encontrada.")
        return
    
    print(f"Encontradas {len(new_images)} imagens\n")
    print("Rotacionando todas para orientação vertical...\n")
    
    fixed_count = 0
    # Rotaciona 90 graus no sentido horário (270 anti-horário)
    for img_path in new_images:
        if rotate_image(img_path, 90):
            fixed_count += 1
    
    print(f"\n{'='*50}")
    print(f"✅ Concluído!")
    print(f"   {fixed_count}/{len(new_images)} imagens rotacionadas")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
