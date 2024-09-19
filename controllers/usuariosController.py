from flask import request, jsonify
from database.db import db
from models.usuarios import Usuarios

def usuariosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Verificar se o código de usuário já existe
            existing_usuario = Usuarios.query.filter_by(codigo=data['codigo']).first()
            if existing_usuario:
                return jsonify({'error': 'Este código de usuário já existente'}), 400

            # Verificar se o código de funcionário já está atribuído a outro usuário
            existing_funcionario = Usuarios.query.filter_by(cod_funcionario=data['cod_funcionario']).first()
            if existing_funcionario:
                return jsonify({'error': 'Este código de funcionário já está atribuído a outro usuário'}), 400

            usuario = Usuarios(
                codigo=data['codigo'], 
                login=data['login'], 
                senha=data['senha'], 
                cod_funcionario=data['cod_funcionario']
            )
            db.session.add(usuario)
            db.session.commit()
            return jsonify({'message': 'Usuário inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar usuário. Erro {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Usuarios.query.all()
            user = {'usuarios': [usuarios.to_dict() for usuarios in data]}
            return jsonify(user)
        except Exception as e:
            return {'error': f'Não foi possível buscar Usuários. Error: {str(e)}'}, 405

    # Método PUT (para atualizar o usuário)
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_usuario_id = data['codigo']
            put_usuario = Usuarios.query.get(put_usuario_id)
            if not put_usuario:
                return jsonify({'error': 'Usuário não encontrado'}), 404

            # Verificar se o código de funcionário já está atribuído a outro usuário (exceto o atual)
            if 'cod_funcionario' in data:
                existing_funcionario = Usuarios.query.filter_by(cod_funcionario=data['cod_funcionario']).first()
                if existing_funcionario and existing_funcionario.codigo != put_usuario_id:
                    return jsonify({'error': 'Este código de funcionário já está atribuído a outro usuário'}), 400

            put_usuario.login = data.get('login', put_usuario.login)
            put_usuario.senha = data.get('senha', put_usuario.senha)
            put_usuario.cod_funcionario = data.get('cod_funcionario', put_usuario.cod_funcionario)

            db.session.commit()
            return jsonify({'message': 'Usuário atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar usuário. Erro {}'.format(e)}), 400
            
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_usuario = Usuarios.query.get(codigo)
            if delete_usuario is None:
                return {'error': 'Usuario não encontrado'}, 404
            db.session.delete(delete_usuario)
            db.session.commit()
            return 'Usuario deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar usuario. Erro{}'.format(e)}, 400