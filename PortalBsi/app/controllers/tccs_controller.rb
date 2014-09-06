class TccsController < ApplicationController
  before_action :authenticate_user!, only: [:new,:edit]
  def home

  end
  def tipos

  end
  def processo

  end
  def modelo

  end
  def agenda

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
  def update
    @tcc = Tcc.find(params[:id])
    if @tcc.update(user_params)
      redirect_to @tcc, notice: 'Cadastro atualizado com sucesso!'
    else
      render action: :edit
    end
  end
  private
  def tcc_params
    params.require(:tcc).permit(:titulo, :resumo, :data, :orientador, :local, :coorientador)
  end
end