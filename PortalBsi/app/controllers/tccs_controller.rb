class TccsController < ApplicationController
  before_action :authenticate_user!, only: [:new,:edit, :publicar]
  def tipos
  end
  def processo
  end
  def modelo
  end
  def agenda
    @tcc = Tcc.find_by_apresentado(false)
  end
  def publicacoes
  end
  def new
    @tcc = Tcc.new
  end
  def index
    @tccs = Tcc.take(5)
  end
  def create
    @tcc = Tcc.new(tcc_params)
    @tcc.user_id = current_user.id
    if @tcc.save
      TccMailer.create_email(@tcc)
      redirect_to @tcc, notice: 'Cadastro de TCC criado com sucesso!'
    else
      render action: :new
    end
  end
  def show
    @tcc = Tcc.find(params[:id])
  end
  def edit
    @tcc = Tcc.find(params[:id])
  end
  def publicar
    @tcc = Tcc.find(params[:id])
  end
  def salva_publicado
    params[:tcc][:apresentado] = true
    @tcc = Tcc.find(params[:id])
    @tcc.user_id = current_user.id
    if @tcc.update(tcc_params)
      TccMailer.publish_email(@tcc)
      redirect_to @tcc, notice: 'Cadastro atualizado com sucesso!' and return
    end
  else render action: :index
  end
  def update
    @tcc = Tcc.find(params[:id])
    @tcc.user_id = current_user.id
    if @tcc.update(tcc_params)
      redirect_to @tcc, notice: 'Cadastro atualizado com sucesso!'
    end
  else render action: :index
  end
  private
  def tcc_params
    params.require(:tcc).permit(:titulo, :resumo, :data, :orientador, :local,
                                :coorientador, :arquivo,:nome_arquivo,:apresentado)
  end
  def find_by_id(params)
    @tcc = Tcc.find(params[:id])
  end
end