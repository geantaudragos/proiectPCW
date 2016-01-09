class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :facebook_id
      t.integer :user_id
      t.integer :location_id
      t.datetime :facebook_time

      t.timestamps
    end

    add_index :photos, :user_id
    add_index :photos, :location_id
  end
end
