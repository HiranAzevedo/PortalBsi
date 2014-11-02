class User < ActiveRecord::Base
  ROLES = %W[administrador aluno representante_de_empresa]	
  has_one :tcc
  has_many :solicitations
  belongs_to :turma
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "//placehold.it/100"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_presence_of :nome, :matricula
  acts_as_taggable
  after_create :send_account_created_email

   
  def send_account_created_email
    if self.role == "representante_de_empresa"
      self.send_reset_password_instructions 
    end
  end

end
