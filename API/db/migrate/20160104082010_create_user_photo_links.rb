class CreateUserPhotoLinks < ActiveRecord::Migration
  def up
    create_table :user_photo_links do |t|
      t.integer :user_id
      t.integer :photo_id

      t.timestamps
    end
  end

  def down
    drop_table :user_photo_links
  end
end
