module API::V1
  class UsersController < ApplicationController

    def login

    end

    def get_data
      user_id = verify_user_id params[:user_id]

      unless user_id.nil?
        query = "SELECT uid, name, oauth_token, oauth_expires_at
                 FROM USERS
                 WHERE (id = " + user_id + ")"
        user = ActiveRecord::Base.connection.exec_query(query)
        render :json => user
      else
        render :json => {}
      end
    end

    def save_locations

    end

    def get_locations
      user_id = verify_user_id params[:user_id]

      unless user_id.nil?
        query = "SELECT name, longitude, latitude, city
                 FROM LOCATIONS
                 WHERE (user_id = " + user_id + ")"
        locations = ActiveRecord::Base.connection.exec_query(query)
        render :json => locations
      else
        render :json => {}
      end
    end

    def save_photos
      #do not forget about location
    end

    def get_photos
      user_id = verify_user_id params[:user_id]
      unless user_id.nil?
        query = "SELECT facebook_id, facebook_time
                  FROM PHOTOS
                  WHERE (user_id = " + user_id + ")"
        photos = ActiveRecord::Base.connection.exec_query(query)
        render :json => photos
      else
        render :json => {}
      end
    end

    def get_most_traveled_period
      user_id = verify_user_id params[:user_id]
      year = params[:year]
      unless user_id.nil?
        query = "SELECT count(*) \"Number\", to_char(visited_at, 'MON') \"Month\" FROM LOCATIONS
                 WHERE to_char(visited_at, 'YYYY') = " + year + " AND user_id = " + user_id + "
                 GROUP BY to_char(visited_at, 'MON')
                 HAVING count(*) = (
                  SELECT max(count(*)) FROM LOCATIONS
                  WHERE to_char(visited_at, 'YYYY') = " + year + "
                  GROUP BY to_char(visited_at, 'MM')
                 )"
        month = ActiveRecord::Base.connection.exec_query(query)
        render :json => month
      else
        render :json => {}
      end

    end


    def get_most_visited_places
      user_id = verify_user_id params[:user_id]
      unless user_id.nil?
        query = "SELECT * FROM (
                  SELECT DISTINCT count(*) \"Visits\", name
                  FROM LOCATIONS
                  WHERE user_id = " + user_id + "
                  GROUP BY NAME
                  HAVING count(*) <= (
                    SELECT max(count(*))
                    FROM LOCATIONS
                    WHERE USER_ID = " + user_id + "
                    GROUP BY NAME
                  )
                  ORDER BY 1 DESC
                ) WHERE ROWNUM <= 3"
        top_locations = ActiveRecord::Base.connection.exec_query(query)
        render :json => top_locations
      else
        render :json => {}
      end
    end

    def get_most_visited_cities
      user_id = verify_user_id params[:user_id]
      user = User.find(user_id)
      hometown = user.hometown || "NULL"

      unless user_id.nil?
        query = "SELECT * FROM (
                  SELECT DISTINCT CITY
                  FROM LOCATIONS
                  WHERE USER_ID = " + user_id + " AND CITY IS NOT " + hometown + "
                  GROUP BY CITY
                  HAVING count(*) <= (
                         SELECT max(count(*))
                         FROM LOCATIONS
                         WHERE USER_ID = " + user_id + " AND CITY IS NOT " + hometown + "
                         GROUP BY CITY
                         )
                  ORDER BY 1 DESC
                )
                WHERE ROWNUM <= 3"

        top_cities = ActiveRecord::Base.connection.exec_query(query)
        render :json => top_cities
      else
        render :json => {}
      end
    end

    private
      def verify_user_id user_id
        user_id if Integer(user_id) rescue nil
      end

  end
end
