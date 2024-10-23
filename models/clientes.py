from database.db import db

class Clientes(db.Model):

    def to_dict(self):
        return {
            'codigo': self.codigo,
            'nome': self.nome,
            'empresa': self.empresa,  # Incluímos a empresa no dicionário de retorno
            'email': self.email,  # Incluímos o email no dicionário de retorno
            'login': self.login,
            'senha': self.senha,
        }
    
    codigo = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False, unique=True)
    nome = db.Column(db.String(100), nullable=False)
    empresa = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=False) 
    login = db.Column(db.String(100), nullable=False) 
    senha = db.Column(db.String(100), nullable=False)

    def __init__(self, nome, login, senha, empresa=None, email=None):
        self.nome = nome
        self.empresa = empresa
        self.email = email
        self.login = login
        self.senha = senha