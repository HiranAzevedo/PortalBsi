class SolicitacaoTiposController < ApplicationController
  before_action :set_solicitacao_tipo, only: [:show, :edit, :update, :destroy]

  # GET /solicitacao_tipos
  # GET /solicitacao_tipos.json
  def index
    @solicitacao_tipos = SolicitacaoTipo.all
  end

  # GET /solicitacao_tipos/1
  # GET /solicitacao_tipos/1.json
  def show
  end

  # GET /solicitacao_tipos/new
  def new
    @solicitacao_tipo = SolicitacaoTipo.new
  end

  # GET /solicitacao_tipos/1/edit
  def edit
  end

  # POST /solicitacao_tipos
  # POST /solicitacao_tipos.json
  def create
    @solicitacao_tipo = SolicitacaoTipo.new(solicitacao_tipo_params)

    respond_to do |format|
      if @solicitacao_tipo.save
        format.html { redirect_to @solicitacao_tipo, notice: 'Solicitacao tipo was successfully created.' }
        format.json { render action: 'show', status: :created, location: @solicitacao_tipo }
      else
        format.html { render action: 'new' }
        format.json { render json: @solicitacao_tipo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /solicitacao_tipos/1
  # PATCH/PUT /solicitacao_tipos/1.json
  def update
    respond_to do |format|
      if @solicitacao_tipo.update(solicitacao_tipo_params)
        format.html { redirect_to @solicitacao_tipo, notice: 'Solicitacao tipo was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @solicitacao_tipo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /solicitacao_tipos/1
  # DELETE /solicitacao_tipos/1.json
  def destroy
    @solicitacao_tipo.destroy
    respond_to do |format|
      format.html { redirect_to solicitacao_tipos_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_solicitacao_tipo
      @solicitacao_tipo = SolicitacaoTipo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def solicitacao_tipo_params
      params.require(:solicitacao_tipos).permit(:tipo)
    end
end
