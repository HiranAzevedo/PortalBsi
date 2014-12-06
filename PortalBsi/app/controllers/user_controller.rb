class UserController < ApplicationController
  load_and_authorize_resource

  def index
    @users = User.excludes(:id => current_user.id)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if !@user.matricula.empty?
      turma = Turma.find_by_nome(@user.matricula[0..3] + '.' + @user.matricula[4])
      if(turma.nil?)
        turma = Turma.new
        turma.nome = @user.matricula[0..3] + '.' + @user.matricula[4]
        turma.save
      end
      @user.turma = turma
    end
    if @user.save
      flash[:notice] = "Usuário cadastrado com sucesso."
      redirect_to root_path
    else
      render :action => 'new'
    end
  end

  def show

  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      flash[:notice] = "Usuário deletado com sucesso."
      redirect_to root_path
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:nome,:matricula,:email,:admin, :password, :password_confirmation)
  end
end