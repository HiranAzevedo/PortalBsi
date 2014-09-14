class OportunidadesController < ApplicationController

  def new
    @oportunidades = Oportunidades.new
  end

  def index
  end

  def show
  end	

  def create
    @oportunidades = Oportunidades.new(oportunidades_params)
    if @oportunidades.save
       redirect_to @oportunidades, notice: 'Oportunidade cadastrada com sucesso.'
    else
      render action: :new
    end     
  end
  
  def edit
  end

  def update
  end

  def destroy
  end
  
  private
  def oportunidades_params
    params.required(:oportunidades).permit(:company_name, :title, :description, :expiration_date, 
    	                                     :has_partnership)
  end

  def find_by_id(params)
  	@oportunidades = Oportunidades.find(params[:id])
  end	

end