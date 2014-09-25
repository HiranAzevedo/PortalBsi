class CreateProfessors < ActiveRecord::Migration
  def change
    create_table :professors do |t|
      t.string :nome
      t.string :email
      t.string :lattes

      t.timestamps
    end
  end
end
