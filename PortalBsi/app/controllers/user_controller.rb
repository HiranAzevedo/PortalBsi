class UserController < ApplicationController
  load_and_authorize_resource

  def new
    @usuario = User.new
  end

  def create
    @usuario = User.new(params[:user])
    if @usuario.save
      flash[:notice] = "Successfully created User."
      redirect_to root_path
    else
      render :action => 'new'
    end
  end

  def destroy
    @usuario = User.find(params[:id])
    if @usuario.destroy
      flash[:notice] = "Successfully deleted User."
      redirect_to root_path
    end
  end
end