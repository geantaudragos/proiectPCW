class CreateLocations < ActiveRecord::Migration
  def up
    create_table :locations do |t|
      t.string :name
      t.decimal :longitude
      t.decimal :latitude
      t.datetime :visited_at

      t.timestamps
    end
  end

  def down
    drop_table :locations
  end
end
