class EmpresasController < ApplicationController
  authorize_resource
  
  def new
  	@empresa = Empresa.new
  end

  def create
  	@empresa = Empresa.new(params[:empresa])
  	@empresa.request = request
  	if @empresa.deliver
  	  flash.now[:notice] = 'Obrigado pela sua mensagem. Entraremos em contato dentro de 24 hrs'
  	else
  	  flash.now[:error] = 'A mensagem não pode ser enviada.'
  	  render :new
  	end    
  end	
end

