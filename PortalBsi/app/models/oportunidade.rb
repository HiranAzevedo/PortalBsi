class Oportunidade < ActiveRecord::Base
  validates_presence_of :company_name, :title, :description, :expiration_date
  validates_length_of :description, minimum: 30, allow_blank: false
  validates_length_of :company_name, minimum: 3, allow_blank: false
  validates_length_of :title, minimum: 10, allow_blank: false

  scope :greater_than_today, -> { where("expiration_date >=?", DateTime.now)}
end
