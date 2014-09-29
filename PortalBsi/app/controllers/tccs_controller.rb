class TccsController < ApplicationController
  before_action :authenticate_user!, only: [:new,:edit, :publicar]
  def tipos
  end
  def processo
  end
  def modelo
  end
  def agenda
    @tcc = Tcc.where("apresentado = ? and data > ?", false, DateTime.now)
    @prof = Professor.all
  end
  def publicacoes
    @prof = Professor.all
    if params[:tag]
      @tcc = Tcc.tagged_with(params[:tag]).where(apresentado: true)
    else
      @tcc = Tcc.where(apresentado: true)
    end
  end
  def new
    @tcc = Tcc.new
    @prof = Professor.all
  end
  def index
  end
  def create
    @tcc = Tcc.new(tcc_params)
    @prof = Professor.all
    @tcc.apresentado = false
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
    @prof = Professor.all
  end
  def edit
    @tcc = Tcc.find(params[:id])
    @prof = Professor.all
    authorize!(:edit, @tcc)
  end
  def publicar
    @tcc = Tcc.find(params[:id])
    authorize!(:publicar, @tcc)
    if @tcc.data > DateTime.now
      redirect_to @tcc, alert: 'Data para publicação não alcançada' and return
    end
  end
  def lista_publicados
    @tcc = Tcc.all.where(apresentado: true).to_a
  end
  def desfaz_publicado
    @tcc = Tcc.find(params[:id])
    @tcc.apresentado = false
    @tcc.nome_arquivo = ""
    @tcc.arquivo.destroy
    if @tcc.save
      redirect_to @tcc, notice: 'Desfeito' and return
    else
      render action: :index
    end
  end
  def confirma_desfaz_publicado
    @tcc = Tcc.find(params[:id])
    @tcc.apresentado = false
    @tcc.nome_arquivo = ""
    @tcc.arquivo.destroy
    if @tcc.save
      redirect_to @tcc, notice: 'Desfeito' and return
    else
      render action: :index
    end
  end

  def salva_publicado
    params[:tcc][:apresentado] = true
    @tcc = Tcc.find(params[:id])
    authorize!(:salva_publicado, @tcc)
    if @tcc.update(tcc_params)
      TccMailer.publish_email(@tcc)
      redirect_to @tcc, notice: 'Cadastro atualizado com sucesso!' and return
    else
      render action: :index
    end
  end
  def update
    @tcc = Tcc.find(params[:id])
    authorize!(:update, @tcc)
    if @tcc.update(tcc_params)
      redirect_to @tcc, notice: 'Cadastro atualizado com sucesso!' and return
    else
      render action: :index
    end
  end
  private
  def tcc_params
    params.require(:tcc).permit(:titulo, :resumo, :data, :orientador, :local,
                                :coorientador, :arquivo,:nome_arquivo,:apresentado, :tag_list)
  end
  def find_by_id(params)
    @tcc = Tcc.find(params[:id])
  end
end