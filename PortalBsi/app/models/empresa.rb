class Empresa < MailForm::Base
#baseado nos sites:
#http://rubyonrailshelp.wordpress.com/2014/01/08/rails-4-simple-form-and-mail-form-to-make-contact-form/
#http://platypus.belighted.com/blog/2013/03/29/mail-form/	
  attribute :name, :validate => true
  attribute :email, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :phone, :validate => /\A([2-9][0-9]{3,})-([0-9]{4,})|([2-9][0-9]{4,})-([0-9]{4,})\z/i
  attribute :message
  attribute :nickname, :captcha => true
  attribute :file, :attachment => true, :validate => :is_file_attached?

  def is_file_attached?
    if file.nil?
      self.errors.add(:file, "Comprovante de vínculo é obrigatório")
    end
  end
  
  def headers
  	{
  	  :subject => "Criação de Conta de Usuário tipo Representante Empresa",
  	  :to => "guilherme.albuquerque@uniriotec.br",
  	  :from => %{"#{name}" <#{email}>}
  	}
  end	

end

