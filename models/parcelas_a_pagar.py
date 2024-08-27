from database.db import db

class Parcelas(db.Model):
    def to_dict(self):
        return {
            'codigo'           : self.codigo,
            'data_parcela'     : self.data_parcela,
            'valor_parcela'    : self.valor_parcela,
            'cod_conta_pagar'  : self.cod_conta_pagar
        }
    
    codigo           = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    data_parcela     = db.Column(db.Date, nullable=False)
    valor_parcela    = db.Column(db.Float(precision=8, asdecimal=True))
    cod_conta_pagar  = db.Column(db.Integer, nullable=False)

    def __init__(self, codigo, data_parcela, valor_parcela, cod_conta_pagar):
        self.codigo           = codigo
        self.data_parcela     = data_parcela
        self.valor_parcela    = valor_parcela
        self.cod_conta_pagar  = cod_conta_pagar
