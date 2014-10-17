class AddTurmaIdForeignKeyToUser < ActiveRecord::Migration
  def change
    add_reference :users, :turma, index: true
  end
end
