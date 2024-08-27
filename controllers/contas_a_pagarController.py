from flask import request, jsonify
from database.db import db
from models.contas_a_pagar import Contas

def contas_a_pagarController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            contas = Contas(codigo=data['codigo'], data_emissao=data['data_emissao'], data_final_pagto=data['data_final_pagto'], valor_total=data['valor_total'], tipo_pagto=data['tipo_pagto'], tipo_icms=data['tipo_icms'], cod_compra=data['cod_compra'],)
            db.session.add(contas)
            db.session.commit()
            return jsonify({'message': 'Contas inserida com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Contas. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Contas.query.all()
            contas = {'contas': [contas.to_dict() for contas in data]}
            return contas

        except Exception as e:
            return 'Não foi possível buscar Contas. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_conta_id = data['codigo']
            put_conta = Contas.query.get(put_conta_id)
            if put_conta is None:
                return {'error': 'Conta não encontrada'}, 404
            put_conta.data_emissao = data.get('data_emissao', put_conta.data_emissao)
            put_conta.data_final_pagto = data.get('data_final_pagto', put_conta.data_final_pagto)
            put_conta.valor_total = data.get('valor_total', put_conta.valor_total)
            put_conta.tipo_pagto = data.get('tipo_pagto', put_conta.tipo_pagto)
            put_conta.taxa_icms = data.get('taxa_icms', put_conta.taxa_icms)
            put_conta.cod_compra = data.get('cod_compra', put_conta.cod_compra)
            # print
            print(put_conta.data_emissao, put_conta.data_final_pagto, put_conta.valor_total, put_conta.tipo_pagto, put_conta.taxa_icms, put_conta.cod_compra)
            db.session.commit()
            return 'Contas alterada com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Contas. Erro{}'.format(e)}, 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_conta = Contas.query.get(codigo)
            if delete_conta is None:
                return {'error': 'Contas não encontrada'}, 404
            db.session.delete(delete_conta)
            db.session.commit()
            return 'Contas deletada com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Contas. Erro{}'.format(e)}, 400
