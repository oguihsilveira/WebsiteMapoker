from database.db import db

class Mvto_estoque(db.Model):
    def to_dict(self):
        return {
            'codigo'        : self.codigo,
            'quantidade'    : self.quantidade,
            'tipo'          : self.tipo,
            'codProduto'    : self.codProduto,
            'codFornecedor' : self.codFornecedor,
            'dataEntrada'   : self.dataEntrada,
            'localizacao'   : self.localizacao,
            'observacoes'   : self.observacoes,
            'numeroLote'    : self.numeroLote,
            'valorUnitario' : self.valorUnitario
        }
    
    codigo = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    quantidade = db.Column(db.Integer)
    tipo = db.Column(db.String(50))
    codProduto = db.Column(db.Integer)
    codFornecedor = db.Column(db.Integer)
    dataEntrada = db.Column(db.Date)
    localizacao = db.Column(db.String(50))
    observacoes = db.Column(db.String(50))
    numeroLote = db.Column(db.String(50))
    valorUnitario = db.Column(db.Float(10, 2))

    def __init__(self, codigo, quantidade, tipo, codProduto, codFornecedor, dataEntrada, localizacao, observacoes, numeroLote, valorUnitario):
        self.codigo = codigo
        self.quantidade = quantidade
        self.tipo = tipo
        self.codProduto = codProduto
        self.codFornecedor = codFornecedor
        self.dataEntrada = dataEntrada
        self.localizacao = localizacao
        self.observacoes = observacoes
        self.numeroLote = numeroLote
        self.valorUnitario = valorUnitario