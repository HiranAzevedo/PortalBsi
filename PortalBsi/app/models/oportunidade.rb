class Oportunidade < ActiveRecord::Base
  TYPES = %W[estágio bolsa_permanência jovens_talentos monitoria iniciação_científica ciência_sem_fronteiras mobilidade_academica]		
  validates_presence_of :company_name, :title, :description, :expiration_date
  validates_length_of :description, minimum: 30, allow_blank: false
  validates_length_of :company_name, minimum: 3, allow_blank: false
  validates_length_of :title, minimum: 10, allow_blank: false
  validates :type, inclusion: { :in => TYPES}, allow_blank: false
  validates :currency, :numericality => { :greater_than => 0.01, :allow_blank => true}
  #validates :has_partnership, inclusion: [true, false]

  mount_uploader :picture, PictureUploader
  acts_as_taggable
  self.inheritance_column = nil

  scope :greater_than_today, -> { where("expiration_date >=?", DateTime.now)}
  
end
