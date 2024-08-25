from flask import request, jsonify
from database.db import db
from models.marcas import Marcas

def marcasController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            marcas = Marcas(codigo=data['codigo'], nome=data['nome'])
            db.session.add(marcas)
            db.session.commit()
            return jsonify({'message': 'Marca inserida com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar marca. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Marcas.query.all()
            marcas = {'marcas': [marca.to_dict() for marca in data]}
            return marcas

        except Exception as e:
            return 'Não foi possível buscar marcas. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_marcas_id = data['codigo']
            put_marca = Marcas.query.get(put_marcas_id)
            if put_marca is None:
                return {'error': 'Marca não encontrada'}, 404
            put_marca.nome = data.get('nome', put_marca.nome)

            db.session.commit()
            return 'Marca alterada com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar marca. Erro{}'.format(e)}, 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_marca = Marcas.query.get(codigo)
            if delete_marca is None:
                return {'error': 'Marca não encontrada'}, 404
            db.session.delete(delete_marca)
            db.session.commit()
            return 'Marca deletada com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar marca. Erro{}'.format(e)}, 400
