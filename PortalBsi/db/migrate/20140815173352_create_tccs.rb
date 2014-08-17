class CreateTccs < ActiveRecord::Migration
  def change
    create_table :tccs do |t|
      t.string :titulo
      t.string :resumo
      t.date :data
      t.string :orientador
      t.string :local
      t.string :coorientador

      t.timestamps
    end
  end
end
