#!/usr/bin/env python3
"""
Servidor HTTP simple para desarrollo local del curso de Cálculo Diferencial
Uso: python server.py
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuración del servidor
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Manejador personalizado para servir archivos estáticos"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def end_headers(self):
        # Agregar headers CORS para desarrollo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Manejar rutas especiales
        if self.path == '/':
            self.path = '/index.html'
        elif self.path == '/calculo-diferencial':
            self.path = '/index.html'
        
        return super().do_GET()

def start_server():
    """Inicia el servidor HTTP local"""
    
    # Verificar que estamos en el directorio correcto
    if not os.path.exists('index.html'):
        print("❌ Error: No se encontró index.html")
        print("   Asegúrate de ejecutar este script desde el directorio del curso")
        return
    
    # Crear el servidor
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor iniciado en http://{HOST}:{PORT}")
        print(f"📚 Curso de Cálculo Diferencial disponible")
        print(f"🔗 Abre tu navegador en: http://{HOST}:{PORT}")
        print("\n📋 Archivos disponibles:")
        print("   • index.html - Página principal")
        print("   • modulo1_relaciones_funciones.html - Módulo 1")
        print("   • modulo2_limites.html - Módulo 2")
        print("   • modulo3_continuidad.html - Módulo 3")
        print("   • modulo4_la_derivada.html - Módulo 4")
        print("   • modulo5_aplicaciones_derivada.html - Módulo 5")
        print("\n🛑 Presiona Ctrl+C para detener el servidor")
        
        # Intentar abrir el navegador automáticamente
        try:
            webbrowser.open(f'http://{HOST}:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor detenido")

if __name__ == "__main__":
    start_server()
