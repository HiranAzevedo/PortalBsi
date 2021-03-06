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
    if !params[:oportunidade][:tag_ids].empty?
      params[:oportunidade][:tag_ids].each do |tag_id|
        if !tag_id.empty?
          tag = Tag.find(tag_id)
          @oportunidade.tag_list.add(tag.name)
        end
      end
    end

    if @oportunidade.save
       redirect_to oportunidades_path, notice: 'Oportunidade cadastrada com sucesso.'  
    else
      render action: :new
    end     

  end
  
  def edit
  end

  def update
  	if @oportunidade.update(oportunidade_params)
  	  redirect_to @oportunidade, notice: 'Oportunidade atualizada com sucesso.'
  	else
  	  render :edit
  	end  
  end

  def destroy
    @oportunidade = Oportunidade.find(params[:id])
    @oportunidade.tag_list.clear
  	@oportunidade.destroy
  	redirect_to oportunidades_url, notice: 'A Oportunidade foi removida.'
  end
  
  private
  def oportunidade_params
    params.require(:oportunidade).permit(:company_name, :title, :description, :expiration_date, 
    	                                     :has_partnership, :picture, :tag_ids, :type, :currency)
  end
end