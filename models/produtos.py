from database.db import db

class Produtos(db.Model):
    def to_dict(self):
        return {
            'codigo': self.codigo,
            'nome': self.nome,
            'preco': self.preco,
            'status': self.status,
            'quantidade': self.quantidade,
            'codMarca': self.codMarca,
            'codFornecedor': self.codFornecedor
        }
    
    codigo = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    nome = db.Column(db.String(50))
    preco = db.Column(db.Numeric(10, 2))
    status = db.Column(db.String(50))
    quantidade = db.Column(db.Integer)
    codMarca = db.Column(db.Integer)
    codFornecedor = db.Column(db.Integer)

    def __init__(self, codigo, nome, preco, status, quantidade, codMarca, codFornecedor):
        self.codigo = codigo
        self.nome = nome
        self.preco = preco
        self.status = status
        self.quantidade = quantidade
        self.codMarca = codMarca
        self.codFornecedor = codFornecedor