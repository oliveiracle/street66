#!/usr/bin/env python3
"""
Script para corrigir orientação de imagens baseado em dados EXIF
"""

from PIL import Image, ExifTags
import os
from pathlib import Path


def fix_image_orientation(image_path):
    """
    Corrige a orientação da imagem baseado nos dados EXIF
    
    Args:
        image_path: Caminho da imagem a ser corrigida
    """
    try:
        img = Image.open(image_path)
        
        # Tenta obter informações EXIF
        try:
            exif = img._getexif()
            if exif is not None:
                # Procura a tag de orientação
                orientation_key = None
                for tag, value in ExifTags.TAGS.items():
                    if value == 'Orientation':
                        orientation_key = tag
                        break
                
                if orientation_key and orientation_key in exif:
                    orientation = exif[orientation_key]
                    
                    # Rotaciona baseado no valor EXIF
                    if orientation == 3:
                        img = img.rotate(180, expand=True)
                    elif orientation == 6:
                        img = img.rotate(270, expand=True)
                    elif orientation == 8:
                        img = img.rotate(90, expand=True)
                    
                    # Salva a imagem corrigida
                    # Remove dados EXIF para evitar dupla rotação
                    img.save(image_path, 'WEBP', quality=85, method=6)
                    print(f"✓ Corrigido: {os.path.basename(image_path)}")
                    return True
                else:
                    print(f"  Sem orientação EXIF: {os.path.basename(image_path)}")
                    return False
        except (AttributeError, KeyError, IndexError):
            print(f"  Sem dados EXIF: {os.path.basename(image_path)}")
            return False
            
    except Exception as e:
        print(f"✗ Erro ao processar {image_path}: {e}")
        return False


def main():
    # Diretório de cocktails
    cocktails_dir = Path("assets/images/backgrounds/cocktails")
    
    if not cocktails_dir.exists():
        print(f"Erro: Diretório {cocktails_dir} não encontrado!")
        return
    
    print("🔄 Corrigindo orientação das imagens de cocktails...\n")
    
    # Processa apenas as novas fotos (20251105_*.webp)
    new_images = sorted([
        f for f in cocktails_dir.iterdir()
        if f.is_file() and f.name.startswith('20251105_') and f.suffix == '.webp'
    ])
    
    if not new_images:
        print("Nenhuma imagem nova encontrada para corrigir.")
        return
    
    print(f"Encontradas {len(new_images)} imagens para verificar\n")
    
    fixed_count = 0
    for img_path in new_images:
        if fix_image_orientation(img_path):
            fixed_count += 1
    
    print(f"\n{'='*50}")
    print(f"✅ Concluído!")
    print(f"   {fixed_count} imagens corrigidas")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
