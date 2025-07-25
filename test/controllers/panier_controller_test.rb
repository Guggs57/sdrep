require "test_helper"

class PanierControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get panier_show_url
    assert_response :success
  end
end
