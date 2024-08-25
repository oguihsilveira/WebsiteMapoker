from database.db import db

class Fornecedores(db.Model):
    def to_dict(self):

        return{
            'codigo'    : self.codigo,
            'empresa'   : self.empresa,
            'endereco'  : self.endereco,
            'telefone'  : self.telefone,
            'email'     : self.email
        }
    
    codigo = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    empresa = db.Column(db.String(100))
    endereco = db.Column(db.String(100))
    telefone = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, codigo,empresa,endereco,telefone,email):
        self.codigo= codigo
        self.empresa  = empresa
        self.endereco = endereco
        self.telefone = telefone
        self.email = email