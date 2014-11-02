class BsiMailer < ActionMailer::Base
  include Devise::Mailers::Helpers

  default from: "sistema@uniriotec.br"

  def create_email(tcc)
    @tcc = tcc
    mail({
             to: "thiagobleao@gmail.com",
             bcc: ['hiran.tassinari@gmail.com'],
             subject: "Novo Tcc criado"
         })
    mail.deliver
  end
  def publish_email(tcc)
    @tcc = tcc
    mail({
             to: "thiagobleao@gmail.com",
             bcc: ['hiran.tassinari@gmail.com'],
             subject: 'Tcc publicado'
         })
    mail.deliver
  end
  def create_company_email(user)
    @user = user
    mail({
              to: user.email,
              subject: "Conta Criada"

        })
    mail.deliver
  end
  def publish_company_email(user)
    @user = user
    mail({
              to: user.email,
              subject: "Conta Criada"
        })
    mail.deliver
  end
  def reset_password_instructions(user, token, options)
    devise_mail(user, :reset_password_instructions)
    super
  end  
end