#!/usr/bin/env python3
"""
Verificador de Dependencias - Curso de Cálculo Diferencial
Verifica que todos los archivos necesarios estén presentes y funcionen correctamente
"""

import os
import sys
import json
import requests
from pathlib import Path

class DependencyChecker:
    def __init__(self):
        self.base_path = Path(__file__).parent
        self.errors = []
        self.warnings = []
        self.success = []
        
    def check_file_exists(self, file_path, description=""):
        """Verifica que un archivo exista"""
        full_path = self.base_path / file_path
        if full_path.exists():
            self.success.append(f"✅ {description or file_path} - Existe")
            return True
        else:
            self.errors.append(f"❌ {description or file_path} - No encontrado")
            return False
    
    def check_html_structure(self, file_path):
        """Verifica la estructura básica de un archivo HTML"""
        full_path = self.base_path / file_path
        if not full_path.exists():
            return False
            
        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Verificar elementos básicos
            checks = [
                ('<!DOCTYPE html>', 'DOCTYPE'),
                ('<html', 'Etiqueta HTML'),
                ('<head>', 'Sección HEAD'),
                ('<body>', 'Sección BODY'),
                ('</html>', 'Cierre HTML')
            ]
            
            for check, description in checks:
                if check in content:
                    self.success.append(f"✅ {file_path} - {description}")
                else:
                    self.warnings.append(f"⚠️ {file_path} - Falta {description}")
                    
        except Exception as e:
            self.errors.append(f"❌ {file_path} - Error al leer: {e}")
    
    def check_cdn_resources(self):
        """Verifica que los recursos CDN estén disponibles"""
        cdn_urls = [
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
            "https://cdn.jsdelivr.net/npm/chart.js",
            "https://polyfill.io/v3/polyfill.min.js?features=es6",
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ]
        
        for url in cdn_urls:
            try:
                response = requests.head(url, timeout=5)
                if response.status_code == 200:
                    self.success.append(f"✅ CDN - {url}")
                else:
                    self.warnings.append(f"⚠️ CDN - {url} (Status: {response.status_code})")
            except Exception as e:
                self.warnings.append(f"⚠️ CDN - {url} (Error: {e})")
    
    def check_firebase_config(self):
        """Verifica la configuración de Firebase"""
        config_file = self.base_path / "firebase-config.js"
        if not config_file.exists():
            self.errors.append("❌ firebase-config.js - No encontrado")
            return
            
        try:
            with open(config_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Verificar elementos de configuración
            firebase_checks = [
                ('apiKey:', 'API Key'),
                ('authDomain:', 'Auth Domain'),
                ('projectId:', 'Project ID'),
                ('storageBucket:', 'Storage Bucket'),
                ('messagingSenderId:', 'Messaging Sender ID'),
                ('appId:', 'App ID')
            ]
            
            for check, description in firebase_checks:
                if check in content:
                    self.success.append(f"✅ Firebase Config - {description}")
                else:
                    self.warnings.append(f"⚠️ Firebase Config - Falta {description}")
                    
        except Exception as e:
            self.errors.append(f"❌ firebase-config.js - Error al leer: {e}")
    
    def check_module_consistency(self):
        """Verifica la consistencia entre módulos"""
        modules = [
            "modulo1_relaciones_funciones.html",
            "modulo2_limites.html", 
            "modulo3_continuidad.html",
            "modulo4_la_derivada.html",
            "modulo5_aplicaciones_derivada.html"
        ]
        
        for module in modules:
            self.check_file_exists(module, f"Módulo {module}")
            self.check_html_structure(module)
    
    def check_navigation_links(self):
        """Verifica que los enlaces de navegación sean correctos"""
        index_file = self.base_path / "index.html"
        if not index_file.exists():
            return
            
        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Verificar que todos los módulos estén referenciados
            modules = ["modulo1_relaciones_funciones.html", "modulo2_limites.html", 
                      "modulo3_continuidad.html", "modulo4_la_derivada.html", 
                      "modulo5_aplicaciones_derivada.html"]
            
            for module in modules:
                if module in content:
                    self.success.append(f"✅ index.html - Referencia a {module}")
                else:
                    self.warnings.append(f"⚠️ index.html - Falta referencia a {module}")
                    
        except Exception as e:
            self.errors.append(f"❌ index.html - Error al leer: {e}")
    
    def run_all_checks(self):
        """Ejecuta todas las verificaciones"""
        print("🔍 Verificando dependencias del Curso de Cálculo Diferencial...\n")
        
        # Verificaciones básicas
        print("📁 Verificando archivos principales...")
        self.check_file_exists("index.html", "Página principal")
        self.check_file_exists("firebase-config.js", "Configuración Firebase")
        self.check_file_exists("auth-manager.js", "Gestor de autenticación")
        self.check_file_exists("package.json", "Configuración del proyecto")
        
        print("\n📚 Verificando módulos...")
        self.check_module_consistency()
        
        print("\n🔗 Verificando enlaces de navegación...")
        self.check_navigation_links()
        
        print("\n⚙️ Verificando configuración de Firebase...")
        self.check_firebase_config()
        
        print("\n🌐 Verificando recursos CDN...")
        self.check_cdn_resources()
        
        # Mostrar resultados
        print("\n" + "="*60)
        print("📊 RESUMEN DE VERIFICACIÓN")
        print("="*60)
        
        if self.success:
            print(f"\n✅ ÉXITOS ({len(self.success)}):")
            for success in self.success:
                print(f"   {success}")
        
        if self.warnings:
            print(f"\n⚠️ ADVERTENCIAS ({len(self.warnings)}):")
            for warning in self.warnings:
                print(f"   {warning}")
        
        if self.errors:
            print(f"\n❌ ERRORES ({len(self.errors)}):")
            for error in self.errors:
                print(f"   {error}")
        
        # Resultado final
        print("\n" + "="*60)
        if self.errors:
            print("❌ VERIFICACIÓN FALLIDA - Corrige los errores antes de continuar")
            return False
        elif self.warnings:
            print("⚠️ VERIFICACIÓN COMPLETADA CON ADVERTENCIAS")
            return True
        else:
            print("✅ VERIFICACIÓN EXITOSA - Todo está listo para usar")
            return True

def main():
    checker = DependencyChecker()
    success = checker.run_all_checks()
    
    if not success:
        sys.exit(1)
    else:
        print("\n🚀 El curso está listo para ejecutarse!")
        print("   Usa: python server.py")

if __name__ == "__main__":
    main()
