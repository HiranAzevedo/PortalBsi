class OportunidadesController < ApplicationController
  
  def index
  end

  def show
  end	

  def new
  	@oportunidades = Oportunidades.new
  end

  def create
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
    	                                   :is_approved, :has_partnership)
  end

  def find_by_id(params)
  	@oportunidades = Oportunidades.find(params[:id])
  end	

end