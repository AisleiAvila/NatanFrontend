#!/usr/bin/env python3
import http.server
import socketserver
import os
import mimetypes
import socket
from urllib.parse import urlparse

DIRECTORY = "src"

def find_free_port(start_port=5000, max_attempts=50):
    """Find a free port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                s.bind(('0.0.0.0', port))
                return port
        except OSError:
            continue
    return None

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/':
            self.path = '/index.html'
        
        # Try to serve the requested file
        try:
            super().do_GET()
        except:
            # If file not found, serve index.html for SPA routing
            self.path = '/index.html'
            super().do_GET()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    port = find_free_port(5000)
    
    if port is None:
        print("No available port found!")
        exit(1)
    
    with socketserver.TCPServer(("0.0.0.0", port), CustomHandler) as httpd:
        print(f"Natan Construtora server running on http://0.0.0.0:{port}")
        print("Serving from branch feature/tsk-002")
        print(f"Access the application at: http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")