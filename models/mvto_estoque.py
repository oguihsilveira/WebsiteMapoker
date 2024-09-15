from database.db import db

class mvto_estoque(db.Model):
    def to_dict(self):
        return {
            'codigo'        : self.codigo,
            'item'          : self.item,
            'tipo'          : self.tipo,
            'observacoes'   : self.observacoes,
            'preco_compra'  : self.preco_compra,
            'preco_venda'   : self.preco_venda,
            'data_entrada'  : self.data_entrada,
            'qntd_entrada'  : self.qntd_entrada,
            'cod_produto'   : self.cod_produto,
            'cod_fornecedor': self.cod_fornecedor
        }
    
    codigo          = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    item            = db.Column(db.String(50))
    tipo            = db.Column(db.String(50))
    observacoes     = db.Column(db.String(100))
    preco_compra    = db.Column(db.Float)
    preco_venda     = db.Column(db.Float)
    data_entrada    = db.Column(db.Date)
    qntd_entrada    = db.Column(db.Integer)
    cod_produto     = db.Column(db.Integer)
    cod_fornecedor  = db.Column(db.Integer)

    def __init__(self, codigo, item, tipo, observacoes, preco_compra, preco_venda, data_entrada, qntd_entrada, cod_produto, cod_fornecedor):
        self.codigo         = codigo
        self.item           = item
        self.tipo           = tipo
        self.observacoes    = observacoes
        self.preco_compra   = preco_compra
        self.preco_venda    = preco_venda
        self.data_entrada   = data_entrada
        self.qntd_entrada   = qntd_entrada
        self.cod_produto    = cod_produto
        self.cod_fornecedor = cod_fornecedor
