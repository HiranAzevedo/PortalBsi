class OportunidadesController < ApplicationController
  authorize_resource
  
  def new
    @oportunidade = Oportunidade.new
  end

  def index
    if params[:tag]
  	  @oportunidades = Oportunidade.tagged_with(params[:tag]).greater_than_today.page(params[:page]).per(10)
    else
      @oportunidades = Oportunidade.greater_than_today.page(params[:page]).per(10)
    end  
  end

  def show
  	@oportunidade = Oportunidade.find(params[:id])
  end	

  def create
    @oportunidade = Oportunidade.new(oportunidade_params)
    @oportunidade.tag_list.clear
    params[:oportunidade][:tag_ids].each do |tag_id|
      if !tag_id.empty?
        tag = Tag.find(tag_id)
        @oportunidade.tag_list.add(tag.name)
      end
    end    
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
    @oportunidade = Oportunidade.find(params[:id])
    @oportunidade.tag_list.clear
  	@oportunidade.destroy
  	redirect_to oportunidades_url
  end
  
  private
  def oportunidade_params
    params.require(:oportunidade).permit(:company_name, :title, :description, :expiration_date, 
    	                                     :has_partnership, :picture, :tag_ids)
  end
end