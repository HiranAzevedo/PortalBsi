class ApplicationController < ActionController::Base  
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?

  after_filter :store_location

  def store_location
    # store last url - this is needed for post-login redirect to whatever the user last visited.
    return unless request.get?
    if (request.path != "/users/sign_in" &&
        request.path != "/users/sign_up" &&
        request.path != "/users/password/new" &&
        request.path != "/users/password/edit" &&
        request.path != "/users/confirmation" &&
        request.path != "/users/sign_out" &&
        !request.xhr?) # don't store ajax calls
      session[:previous_url] = request.referrer
    end
  end

  def after_sign_in_path_for(resource)
    session[:previous_url] = request.referrer
    session[:previous_url] || root_path
  end

  def after_sign_out_path_for(resource)
    session[:previous_url] = request.referrer
    session[:previous_url] || root_path
  end

  def after_update_path_for(resource)
    session[:previous_url] = request.referrer
    session[:previous_url] || root_path
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:nome, { role: [] },:matricula, :email, :password) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:nome, :apelido, :matricula, :email, { role: [] }, :facebook_link, :github_link, :password, :password_confirmation, :current_password, :avatar) }
  end

  rescue_from CanCan::AccessDenied do |exception|
    if current_user.nil? # user is not logged in
      session[:next] = request.fullpath
      redirect_to new_user_session_url,
                  :alert => "Por favor faça o login para continuar."
    else
      if request.env["HTTP_REFERER"].present?
        redirect_to :back, :alert => exception.message
      else
        render :file => "#{Rails.root}/public/403.html",
               :status => 403, :layout => false
      end
    end
  end
end
