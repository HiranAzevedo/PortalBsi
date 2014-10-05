class Solicitation < ActiveRecord::Base
  belongs_to :solicitacao_tipo
  belongs_to :user
end
