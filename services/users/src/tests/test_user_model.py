def test_passwords_are_random(test_app, test_database, add_user):
    user_one = add_user("test_user", "test_user@test.com", "testpassword")
    user_two = add_user("test_user_2", "test_user_2@test.com", "testpassword2")

    assert user_one.password != user_two.password
