from database.db import db

class Estoque(db.Model):

    def to_dict(self):
        return {
            'codigo': self.codigo,
            'item': self.item,
            'tipo': self.tipo,
            'observacoes': self.observacoes,
            'preco_compra': float(self.preco_compra),  # Garantindo que seja float
            'preco_venda': float(self.preco_venda),    # Garantindo que seja float
            'data_entrada': self.data_entrada,
            'qtde_entrada': self.qtde_entrada,
            'cod_funcionario': self.cod_funcionario
        }

    codigo = db.Column(db.Integer, primary_key=True, unique=True)
    item = db.Column(db.String(50))
    tipo = db.Column(db.String(50))
    observacoes = db.Column(db.String(50))
    preco_compra = db.Column(db.Float(10, 2))
    preco_venda = db.Column(db.Float(10, 2))
    data_entrada = db.Column(db.Date)
    qtde_entrada = db.Column(db.Integer)
    cod_funcionario = db.Column(db.Integer)

    def __init__(self, codigo, item, tipo, observacoes, preco_compra, preco_venda, data_entrada, qtde_entrada, cod_funcionario):
        self.codigo = codigo
        self.item = item
        self.tipo = tipo
        self.observacoes = observacoes
        self.preco_compra = preco_compra
        self.preco_venda = preco_venda
        self.data_entrada = data_entrada
        self.qtde_entrada = qtde_entrada
        self.cod_funcionario = cod_funcionario