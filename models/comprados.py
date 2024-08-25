from database.db import db

class Comprados(db.Model):
    def to_dict(self):
        return {
            'codigo'        : self.codigo,
            'quantidade'    : self.quantidade,
            'preco'         : self.preco,
            'codFornecedor' : self.codFornecedor,
            'codProduto'    : self.codProduto
        }
    
    codigo = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    quantidade = db.Column(db.Integer)
    preco = db.Column(db.Numeric(10, 2))
    codFornecedor = db.Column(db.Integer)
    codProduto = db.Column(db.Integer)

    def __init__(self, codigo, quantidade, preco, codFornecedor, codProduto):
        self.codigo = codigo
        self.quantidade = quantidade
        self.preco = preco
        self.codFornecedor = codFornecedor
        self.codProduto = codProduto
