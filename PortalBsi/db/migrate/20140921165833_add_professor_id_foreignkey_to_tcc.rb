class AddProfessorIdForeignkeyToTcc < ActiveRecord::Migration
  def change
    add_reference :tccs, :professor, index: true
  end
end
