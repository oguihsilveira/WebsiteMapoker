from database.db import db

class Funcionarios(db.Model):
    def to_dict(self):

        return{
            'codigo'        : self.codigo,
            'nome'          : self.nome,
            'email'         : self.email,
            'datanasc'      : self.datanasc,
            'cargo'         : self.cargo,
            'salario'       : self.salario,
            'endereco'      : self.endereco,
            'carga_horaria' : self.carga_horaria,
        }
    
    codigo          = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    nome            = db.Column(db.String(50))
    email           = db.Column(db.String(50))
    datanasc        = db.Column(db.Date)
    cargo           = db.Column(db.String(50))
    salario         = db.Column(db.Float)
    endereco        = db.Column(db.String(50))
    carga_horaria   = db.Column(db.String(50))


    def __init__(self, codigo, nome, email, datanasc, cargo, salario, endereco, carga_horaria):
        self.codigo         = codigo
        self.nome           = nome
        self.email          = email
        self.datanasc       = datanasc
        self.cargo          = cargo
        self.salario        = salario
        self.endereco       = endereco
        self.carga_horaria  = carga_horaria
