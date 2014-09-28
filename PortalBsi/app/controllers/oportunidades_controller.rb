class OportunidadesController < ApplicationController

  #authorize_resource

  def new
    @oportunidade = Oportunidade.new
  end

  def index
  	@oportunidades = Oportunidade.greater_than_today.page(params[:page]).per(10)
  end

  def show
  	@oportunidade = Oportunidade.find(params[:id])
  end	

  def create
    @oportunidade = Oportunidade.new(oportunidade_params)
    if @oportunidade.save
       redirect_to @oportunidade, notice: 'Oportunidade de Estágio cadastrada com sucesso.'
    else
      render action: :new
    end     
  end
  
  def edit
  end

  def update
  	if @oportunidade.update(oportunidade_params)
  	  redirect_to @oportunidade, notice: 'Oportunidade de Estágio atualizada com sucesso.'
  	else
  	  render :edit
  	end  
  end

  def destroy
  	@oportunidade.destroy
  	redirect_to oportunidades_url
  end
  
  private
  def oportunidade_params
    params.require(:oportunidade).permit(:company_name, :title, :description, :expiration_date, 
    	                                     :has_partnership, :picture)
  end

  def find_by_id(params)
  	@oportunidade = Oportunidade.find(params[:id])
  end	

end