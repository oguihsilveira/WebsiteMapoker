from flask import request, jsonify
from database.db import db
from models.funcionarios import Funcionarios
from models.usuarios import Usuarios

def funcionariosController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            
            # Verifica se a data de nascimento está preenchida
            if not data.get('datanasc'):
                return jsonify({'error': 'Data de nascimento é obrigatória.'}), 400
            
            # Verifica se o código já existe
            existing_funcionario = Funcionarios.query.get(data['codigo'])
            if existing_funcionario:
                return jsonify({'error': 'Código já existe'}), 409  # Retorna status 409 em caso de duplicação

            funcionarios = Funcionarios(
                codigo=data['codigo'],
                nome=data['nome'],
                email=data['email'],
                datanasc=data['datanasc'],
                cargo=data['cargo'],
                salario=data['salario'],
                endereco=data['endereco'],
                carga_horaria=data['carga_horaria'],
            )
            db.session.add(funcionarios)
            db.session.commit()
            return jsonify({'message': 'Funcionário inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Funcionário. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Funcionarios.query.all()
            funcionario = {'funcionarios': [funcionarios.to_dict() for funcionarios in data]}
            return funcionario

        except Exception as e:
            return 'Não foi possível buscar usuários. Error: {}'.format(str(e)), 405

    elif request.method == 'PUT':
        try:
            data = request.get_json()

            # Verifica se a data de nascimento está preenchida
            if not data.get('datanasc'):
                return jsonify({'error': 'Data de nascimento é obrigatória.'}), 400
            
            put_funcionarios_id = data['codigo']
            put_funcionarios = Funcionarios.query.get(put_funcionarios_id)
            if put_funcionarios is None:
                return {'error': 'Funcionário não encontrado'}, 404

            put_funcionarios.nome = data.get('nome', put_funcionarios.nome)
            put_funcionarios.email = data.get('email', put_funcionarios.email)
            put_funcionarios.datanasc = data.get('datanasc', put_funcionarios.datanasc)  # Alterado para datanasc
            put_funcionarios.salario = data.get('salario', put_funcionarios.salario)
            put_funcionarios.endereco = data.get('endereco', put_funcionarios.endereco)
            put_funcionarios.carga_horaria = data.get('carga_horaria', put_funcionarios.carga_horaria)  # Alterado para carga_horaria
            put_funcionarios.cargo = data.get('cargo', put_funcionarios.cargo)
            db.session.commit()
            return 'Funcionário alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Funcionário. Erro: {}'.format(e)}, 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_funcionario = Funcionarios.query.get(codigo)
            
            if delete_funcionario is None:
                return {'error': 'Funcionário não encontrado'}, 404
            
            # Verifica se o funcionário tem um usuário associado
            usuario_associado = Usuarios.query.filter_by(cod_funcionario=codigo).first()
            if usuario_associado:
                return jsonify({'error': 'Não é possível excluir este funcionário, pois ele possui um usuário cadastrado.'}), 400
            
            db.session.delete(delete_funcionario)
            db.session.commit()
            return 'Funcionário deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Funcionário. Erro: {}'.format(e)}, 400