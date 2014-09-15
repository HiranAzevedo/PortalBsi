class OportunidadesController < ApplicationController

  def new
    @oportunidade = Oportunidade.new
  end

  def index
  end

  def show
  	@oportunidade = Oportunidade.find(params[:id])
  end	

  def create
    @oportunidade = Oportunidade.new(oportunidade_params)
    if @oportunidade.save
       redirect_to @oportunidade, notice: 'Oportunidade cadastrada com sucesso.'
    else
      render action: :new
    end     
  end
  
  def edit
  end

  def update
  end

  def destroy
  	@oportunidade.destroy
  	redirect_to oportunidades_url
  end
  
  private
  def oportunidade_params
    params.require(:oportunidade).permit(:company_name, :title, :description, :expiration_date, 
    	                                     :has_partnership)
  end

  def find_by_id(params)
  	@oportunidade = Oportunidade.find(params[:id])
  end	

end