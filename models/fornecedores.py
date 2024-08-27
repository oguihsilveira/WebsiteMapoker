from database.db import db

class Fornecedores(db.Model):
    def to_dict(self):

        return{
            'codigo'    : self.codigo,
            'empresa'   : self.empresa,
            'endereco'  : self.endereco,
            'cnpj'      : self.cnpj,
            'telefone'  : self.telefone,
            'email'     : self.email
        }
    
    codigo      = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    empresa     = db.Column(db.String(50))
    endereco    = db.Column(db.String(50))
    cnpj        = db.Column(db.String(50))
    telefone    = db.Column(db.String(50))
    email       = db.Column(db.String(50))

    def __init__(self, codigo, empresa, endereco, cnpj, telefone, email):
        self.codigo     = codigo
        self.empresa    = empresa
        self.endereco   = endereco
        self.cnpj       = cnpj
        self.telefone   = telefone
        self.email      = email