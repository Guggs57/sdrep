require "test_helper"

class CommandesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get commandes_new_url
    assert_response :success
  end
end
