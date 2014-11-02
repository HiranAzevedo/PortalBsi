class PasswordsController < Devise::PasswordsController

  def new
  	super
  end

  def create
  	 super
  end

  def edit
  	super
  end

  def update
  	super
  end 	
  
  protected

  def after_resetting_password_path_for(resource)
     after_sign_in_path_for(resource)
  end

  def after_sending_reset_password_instructions_path_for(resource_name)
     new_session_path(resource_name) if is_navigational_format?
  end

end   