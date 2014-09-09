class AddAttachmentArquivoToTccs < ActiveRecord::Migration
  def self.up
    change_table :tccs do |t|
      t.attachment :arquivo
    end
  end

  def self.down
    remove_attachment :tccs, :arquivo
  end
end
