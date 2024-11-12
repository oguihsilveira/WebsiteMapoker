from database.db import db

class Pedidos(db.Model):
    def to_dict(self):
        return {
            'codigo': self.codigo,
            'item': self.item,
            'destinatario': self.destinatario,
            'endereco': self.endereco,
            'tipo_pgto': self.tipo_pgto,
            'data_compra': self.data_compra,
            'valor_compra': self.valor_compra,
            'status': self.status,  # Adiciona o status no dicionário
            'cod_produto': self.cod_produto,
            'cod_cliente': self.cod_cliente
        }

    codigo = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    item = db.Column(db.String(100), nullable=False)
    destinatario = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(50), nullable=False)
    tipo_pgto = db.Column(db.String(50), nullable=False)
    data_compra = db.Column(db.Date, nullable=False)
    valor_compra = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)  # Novo campo 'status'
    cod_produto = db.Column(db.Integer, nullable=False)
    cod_cliente = db.Column(db.Integer, nullable=False)

    def __init__(self, codigo, item, destinatario, endereco, tipo_pgto, data_compra, valor_compra, status, cod_produto, cod_cliente):
        self.codigo = codigo
        self.item = item
        self.destinatario = destinatario
        self.endereco = endereco
        self.tipo_pgto = tipo_pgto
        self.data_compra = data_compra
        self.valor_compra = valor_compra
        self.status = status  # Inicializa o campo status
        self.cod_produto = cod_produto
        self.cod_cliente = cod_cliente