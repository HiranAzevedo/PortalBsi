class CreateSolicitations < ActiveRecord::Migration
  def change
    create_table :solicitations do |t|
      t.references :solicitacao_tipos, index: true
      t.references :user, index: true
      t.string :observacao

      t.timestamps
    end
  end
end
