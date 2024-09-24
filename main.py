from flask import Flask
from database.db import db
from routes.index import default_routes
from flask_cors import CORS

class App():
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/mapoker'  # Conexão com o banco
        db.init_app(self.app)
        CORS(self.app)  # Habilita CORS
        default_routes(self.app)  # Registra todas as rotas
        
    def run(self):
        return self.app.run(port=3000, host='localhost', debug=True)  # Executa o servidor na porta 3000

app = App()
app.run()  # Inicia a aplicação
