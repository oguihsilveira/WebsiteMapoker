from database.db import db

class Clientes(db.Model):

    def to_dict(self):
        return {
            'codigo': self.codigo,
            'nome': self.nome,
            'empresa': self.empresa,
            'telefone': self.telefone,
            'email': self.email,
            'login': self.login,
            'senha': self.senha,
        }
    
    codigo = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False, unique=True)
    nome = db.Column(db.String(100), nullable=False)
    empresa = db.Column(db.String(100), nullable=True)
    telefone = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=False) 
    login = db.Column(db.String(50), nullable=False) 
    senha = db.Column(db.String(255), nullable=False)

    def __init__(self, nome, empresa, telefone, email, login, senha):
        self.nome = nome
        self.empresa = empresa
        self.telefone = telefone
        self.email = email
        self.login = login
        self.senha = senha