class RegistrationsController < Devise::RegistrationsController

  def account_update_params
    params.require(:user).permit(:nome, :apelido, :matricula, :email, :password, :password_confirmation, :current_password, :avatar)
  end

  def new
    authorize! :new, User
    build_resource({})
    @validatable = devise_mapping.validatable?
    if @validatable
      @minimum_password_length = resource_class.password_length.min
    end
    respond_with self.resource
  end

end