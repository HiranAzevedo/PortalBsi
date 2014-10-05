class Empresa < MailForm::Base
#baseado nos sites:
#http://rubyonrailshelp.wordpress.com/2014/01/08/rails-4-simple-form-and-mail-form-to-make-contact-form/
#http://platypus.belighted.com/blog/2013/03/29/mail-form/	
  attribute :nome, :validate => true
  attribute :email, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :mensagem
  attribute :nickname, :captcha => true
  attribute :arquivo, :attachment => true
  
  def headers
  	{
  	  :subject => "Criação de Conta de Usuário tipo Representante Empresa",
  	  :to => "guilherme.albuquerque@uniriotec.br",
  	  :from => %{"#{nome}" <#{email}>}

  	}
  end	
end	