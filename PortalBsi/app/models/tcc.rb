class Tcc < ActiveRecord::Base
  has_many :user
  has_attached_file :arquivo
  belongs_to :professor
  validates_attachment_content_type :arquivo, :content_type => ["application/pdf"]
  acts_as_taggable
  validates_presence_of :titulo, :resumo, :data, :orientador
end
