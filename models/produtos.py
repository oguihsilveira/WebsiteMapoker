from database.db import db

class Produtos(db.Model):
    def to_dict(self):
        return {
            'codigo'        : self.codigo,
            'item'          : self.item,
            'marca'         : self.marca,
            'tipo'          : self.tipo,
            'observacoes'   : self.observacoes,
            'preco_compra'  : self.preco_compra,
            'preco_venda'   : self.preco_venda,
            'status'        : self.status,
            'quantidade'    : self.quantidade
        }
    
    codigo          = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    item            = db.Column(db.String(50))
    marca           = db.Column(db.String(50))
    tipo            = db.Column(db.String(50))
    observacoes     = db.Column(db.String(50))
    preco_compra    = db.Column(db.Float)
    preco_venda     = db.Column(db.Float)
    status          = db.Column(db.String(50))
    quantidade      = db.Column(db.Integer)

    def __init__(self, codigo, item, marca, tipo, observacoes, preco_compra, preco_venda, status, quantidade):
        self.codigo         = codigo
        self.item           = item
        self.marca          = marca
        self.tipo           = tipo
        self.observacoes    = observacoes
        self.preco_compra   = preco_compra
        self.preco_venda    = preco_venda
        self.status         = status
        self.quantidade     = quantidade
