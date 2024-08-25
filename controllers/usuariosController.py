from flask import request, jsonify
from database.db import db
from models.usuarios import Usuarios

def usuariosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            usuario = Usuarios(codigo=data['codigo'], nome=data['nome'], login=data['login'], senha=data['senha'])
            print(data)
            db.session.add(usuario)
            db.session.commit()
            return jsonify({'message:': 'Usuario inserido com sucesso'}), 200
        except Exception as e:
            return jsonify ({'error': 'Erro ao cadastrar usuário. Erro {}'.format(str (e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Usuarios.query.all()
            user = {'usuarios': [usuarios.to_dict() for usuarios in data]}
            return jsonify(user)
        except Exception as e:
            return {'error': f'Não foi possível buscar usuários. Error: {str(e)}'}, 405

    # Método PUT
    elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_usuario_id = data['codigo']
                put_usuario = Usuarios.query.get(put_usuario_id)
                if put_usuario is None:
                    return {'error': 'Cliente não encontrado'}, 404
                put_usuario.nome = data.get('nome', put_usuario.nome)
                put_usuario.login = data.get('login', put_usuario.login)
                put_usuario.senha = data.get('senha', put_usuario.senha)
                print(put_usuario.nome, put_usuario.login, put_usuario.senha)
                db.session.commit()
                return 'Usuario alterado com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar Usuario. Erro{}'.format(e)}, 400
            
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