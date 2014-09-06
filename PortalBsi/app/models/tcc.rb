class Tcc < ActiveRecord::Base
  belongs_to :user
  validates :user_id, presence: true
  validates_presence_of :titulo, :resumo, :data, :orientador, :local
end
