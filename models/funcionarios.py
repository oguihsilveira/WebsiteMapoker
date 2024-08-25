from database.db import db

class Funcionarios(db.Model):
    def to_dict(self):

        return{
            'codigo'      : self.codigo,
            'nome'        : self.nome,
            'email'       : self.email,
            'senha'       : self.senha,
            'salario'     : self.salario,
            'endereco'    : self.endereco,
            'cargaHoraria': self.cargaHoraria,
            'cargo'       : self.cargo
        }
    
    codigo       = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    nome         = db.Column(db.String(100))
    email        = db.Column(db.String(100))
    senha        = db.Column(db.String(100))
    salario      = db.Column(db.Float)
    endereco     = db.Column(db.String(100))
    cargaHoraria = db.Column(db.String(100))
    cargo        = db.Column(db.String(100))

    def __init__(self, nome,email,senha,codigo,salario,endereco,cargaHoraria,cargo):
        self.codigo       = codigo
        self.nome         = nome
        self.email        = email
        self.senha        = senha
        self.salario      = salario
        self.endereco     = endereco
        self.cargaHoraria = cargaHoraria
        self.cargo        = cargo