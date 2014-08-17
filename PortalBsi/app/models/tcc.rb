class Tcc < ActiveRecord::Base
  validates_presence_of :titulo, :resumo, :data, :orientador, :local
end
