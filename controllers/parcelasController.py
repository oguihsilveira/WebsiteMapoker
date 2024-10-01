from flask import request, jsonify
from database.db import db
from models.parcelas import Parcelas

def parcelas_pagamentosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            parcelas = Parcelas(codigo=data['codigo'], data_parcela=data['data_parcela'], valor_parcela=data['valor_parcela'], cod_conta_a_pagar=data['cod_conta_a_pagar'])
            db.session.add(parcelas)
            db.session.commit()
            return jsonify({'message': 'Parcelas inserida com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Parcelas. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Parcelas.query.all()
            parcelas = {'parcelas': [parcelas.to_dict() for parcelas in data]}
            return parcelas

        except Exception as e:
            return 'Não foi possível buscar Parcelas. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_parcela_id = data['codigo']
            put_parcela = Parcelas.query.get(put_parcela_id)
            if put_parcela is None:
                return {'error': 'Conta não encontrada'}, 404
            put_parcela.data_parcela = data.get('data_parcela', put_parcela.data_parcela)
            put_parcela.valor_parcela = data.get('valor_parcela', put_parcela.valor_parcela)
            put_parcela.cod_conta_a_pagar = data.get('cod_conta_a_pagar', put_parcela.cod_conta_a_pagar)
            # print
            print(put_parcela.data_parcela, put_parcela.valor_parcela, put_parcela.cod_conta_a_pagar)
            db.session.commit()
            return 'Parcelas alterada com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Parcelas. Erro{}'.format(e)}, 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_conta = Parcelas.query.get(codigo)
            if delete_conta is None:
                return {'error': 'Parcelas não encontrada'}, 404
            db.session.delete(delete_conta)
            db.session.commit()
            return 'Parcelas deletada com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Parcelas. Erro{}'.format(e)}, 400