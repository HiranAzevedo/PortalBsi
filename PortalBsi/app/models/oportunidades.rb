class Oportunidades < ActiveRecord::Base
  validates_presence_of :company_name, :title, :description, :expiration_date, :has_partnership
  validates_length_of :description, minimum: 30, allow_blank: false
  validates_length_of :company_name, minimum: 3, allow_blank: false
  validates_length_of :title, minimum: 10, allow_blank: false
end
