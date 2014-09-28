class OportunidadesController < ApplicationController

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

  #def picture_url
  #	@oportunidade.picture_url
  #end

  #def thumb_url
  #	@oportunidade.picture.thumb.url
  #end

  #def has_picture?
  #	@oportunidade.picture?
  #end	
  
  private
  def oportunidade_params
    params.require(:oportunidade).permit(:company_name, :title, :description, :expiration_date, 
    	                                     :has_partnership, :picture)
  end

  def find_by_id(params)
  	@oportunidade = Oportunidade.find(params[:id])
  end	

end