from database.db import db

class Contas(db.Model):
    def to_dict(self):
        return {
            'codigo': self.codigo,
            'nome': self.nome
        }
    
    codigo = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    nome = db.Column(db.String(50), nullable=False)

    def __init__(self, codigo, nome):
        self.codigo = codigo
        self.nome = nome