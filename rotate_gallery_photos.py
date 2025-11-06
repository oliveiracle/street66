#!/usr/bin/env python3
"""
Script para rotacionar fotos da galeria que estão na orientação errada
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
    # Diretório de galeria otimizada
    gallery_dir = Path("assets/images/gallery_optimized")
    
    if not gallery_dir.exists():
        print(f"Erro: Diretório {gallery_dir} não encontrado!")
        return
    
    print("🔄 Rotacionando fotos da galeria que estão viradas...\n")
    
    # Lista das fotos de 05/11 que precisam ser rotacionadas
    images_to_rotate = [
        '20251105_205346.webp',
        '20251105_205407.webp',
        '20251105_205502.webp',
        '20251105_205647 (1).webp',
        '20251105_205647.webp',
        '20251105_205711 (1).webp',
        '20251105_205711.webp',
        '20251105_205748 (1).webp',
        '20251105_205748.webp',
    ]
    
    fixed_count = 0
    for img_name in images_to_rotate:
        img_path = gallery_dir / img_name
        if img_path.exists():
            if rotate_image(img_path, 90):
                fixed_count += 1
        else:
            print(f"⚠ Não encontrado: {img_name}")
    
    print(f"\n{'='*50}")
    print(f"✅ Concluído!")
    print(f"   {fixed_count}/{len(images_to_rotate)} imagens rotacionadas")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
