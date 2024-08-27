from database.db import db

class Usuarios(db.Model):

    def to_dict(self):
        
        return{
            'codigo'            : self.codigo,
            'login'             : self.login,
            'senha'             : self.senha,
            'cod_funcionario'   : self.cod_funcionario        
        }
    
    codigo          = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    login           = db.Column(db.String(100))
    senha           = db.Column(db.String(100))
    cod_funcionario = db.Column(db.Integer)

    def __init__(self, codigo, login, senha, cod_funcionario):
        self.codigo             = codigo
        self.login              = login
        self.senha              = senha
        self.cod_funcionario    = cod_funcionario