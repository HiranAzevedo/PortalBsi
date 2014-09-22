class Tcc < ActiveRecord::Base
  belongs_to :user
  has_attached_file :arquivo
  belongs_to :professor
  validates_attachment_content_type :arquivo, :content_type => ["application/pdf"]
  validates :user_id, presence: true
  validates_presence_of :titulo, :resumo, :data, :orientador, :apresentado
  validates_uniqueness_of :user_id, allow_nil: false
end
