class Oportunidade < ActiveRecord::Base
  TYPES = %W[estagio monitoria jovens_talentos iniciação_científica ]		
  validates_presence_of :company_name, :title, :description, :expiration_date
  validates_length_of :description, minimum: 30, allow_blank: false
  validates_length_of :company_name, minimum: 3, allow_blank: false
  validates_length_of :title, minimum: 10, allow_blank: false
  validates :type, inclusion: { :in => TYPES}, allow_blank: false

  mount_uploader :picture, PictureUploader
  acts_as_taggable
  self.inheritance_column = nil

  scope :greater_than_today, -> { where("expiration_date >=?", DateTime.now)}

end
