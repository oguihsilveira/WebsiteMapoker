from flask import Flask, send_from_directory
from database.db import db
from routes.index import default_routes
from flask_cors import CORS
import os

class App():
    def __init__(self) -> None:
        self.app = Flask(__name__)  # Inicializa o Flask sem o static_folder
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/mapoker'  # Conexão com o banco
        db.init_app(self.app)
        CORS(self.app)  # Habilita CORS
        default_routes(self.app)  # Registra todas as rotas

        # Rota para servir arquivos da pasta /uploads
        @self.app.route('/uploads/<path:filename>')
        def upload_files(filename):
            return send_from_directory('uploads', filename)  # Serve arquivos da pasta uploads

    def run(self):
        return self.app.run(port=3000, host='localhost', debug=True)  # Executa o servidor na porta 3000

app = App()
app.run()  # Inicia a aplicação