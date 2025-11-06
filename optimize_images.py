#!/usr/bin/env python3
"""
Script para otimizar imagens da galeria para mobile
Converte JPG para WebP e redimensiona mantendo qualidade
"""

from PIL import Image
import os
from pathlib import Path

def optimize_image(input_path, output_path, max_width=1200, quality=85):
    """
    Otimiza uma imagem redimensionando e convertendo para WebP
    
    Args:
        input_path: Caminho da imagem original
        output_path: Caminho para salvar a imagem otimizada
        max_width: Largura máxima (mantém proporção)
        quality: Qualidade da compressão (1-100)
    """
    try:
        with Image.open(input_path) as img:
            # Converte para RGB se necessário (ex: PNG com transparência)
            if img.mode in ('RGBA', 'LA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = rgb_img
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Redimensiona se a largura for maior que max_width
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Salva como WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            
            # Calcula redução de tamanho
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"✓ {os.path.basename(input_path)}")
            print(f"  {original_size/1024:.1f}KB → {new_size/1024:.1f}KB ({reduction:.1f}% menor)")
            
            return True
            
    except Exception as e:
        print(f"✗ Erro ao processar {input_path}: {e}")
        return False

def main():
    # Diretórios
    gallery_dir = Path("assets/images/gallery_optimized")
    
    # Verifica se o diretório existe
    if not gallery_dir.exists():
        print(f"Erro: Diretório {gallery_dir} não encontrado!")
        return
    
    print("🖼️  Otimizando imagens da galeria...\n")
    
    # Processa apenas arquivos JPG/JPEG
    image_extensions = ['.jpg', '.jpeg', '.JPG', '.JPEG']
    images = [f for f in gallery_dir.iterdir() 
              if f.is_file() and f.suffix in image_extensions]
    
    if not images:
        print("Nenhuma imagem JPG encontrada para otimizar.")
        return
    
    print(f"Encontradas {len(images)} imagens para otimizar\n")
    
    success_count = 0
    for img_path in images:
        # Nome do arquivo de saída (troca extensão para .webp)
        output_name = img_path.stem + '.webp'
        output_path = gallery_dir / output_name
        
        if optimize_image(img_path, output_path):
            success_count += 1
            # Remove o arquivo JPG original após conversão bem-sucedida
            try:
                img_path.unlink()
                print(f"  Removido arquivo original JPG\n")
            except Exception as e:
                print(f"  Aviso: não foi possível remover {img_path}: {e}\n")
    
    print(f"\n{'='*50}")
    print(f"✅ Otimização concluída!")
    print(f"   {success_count}/{len(images)} imagens processadas com sucesso")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
