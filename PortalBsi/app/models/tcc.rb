class Tcc < ActiveRecord::Base
  belongs_to :user
  has_attached_file :arquivo
  validates_attachment_content_type :arquivo, :content_type => ["application/pdf"]
  validates :user_id, presence: true
  validates_presence_of :titulo, :resumo, :data, :orientador
end
