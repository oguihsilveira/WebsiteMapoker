from database.db import db

class Compras(db.Model):
    def to_dict(self):
        return {
            'codigo'            : self.codigo,
            'item'              : self.item,
            'quantidade'        : self.quantidade,
            'data_compra'       : self.data_compra,
            'valor_compra'      : self.valor_compra,
            'cod_fornecedor'    : self.cod_fornecedor,
            'cod_funcionario'   : self.cod_funcionario
        }
    
    codigo          = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    item            = db.Column(db.String(50))
    quantidade      = db.Column(db.Integer)
    data_compra     = db.Column(db.Date)
    valor_compra    = db.Column(db.Float)
    cod_fornecedor  = db.Column(db.Integer)
    cod_funcionario = db.Column(db.Integer)

    def __init__(self, codigo, item, quantidade, data_compra, valor_compra, cod_fornecedor, cod_funcionario):
        self.codigo             = codigo
        self.item               = item
        self.quantidade         = quantidade
        self.data_compra        = data_compra
        self.valor_compra       = valor_compra
        self.cod_fornecedor     = cod_fornecedor
        self.cod_funcionario    = cod_funcionario
