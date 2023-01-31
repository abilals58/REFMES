import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

WEB_LINK="https://www.refmes.org/"
LOCAL_LINK="http://localhost:3000/"


class WholeCycleReset(unittest.TestCase): # test to reset password with wrong email
    def setUp(self):
        PATH_ABILAL="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_ABILAL)
        self.driver=webdriver.Chrome(service=ser)
    
    def test_send_email_in_reset_password(self):
        driver = self.driver
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        reset = driver.find_element(By.LINK_TEXT, "Forgot password?")
        reset.click()
        time.sleep(2)

        #wrong email
        Email=driver.find_element(By.XPATH,"//input[@type='email']")
        Email.send_keys("a.bilal@gmail.com")
        Email.send_keys(Keys.RETURN)
        time.sleep(3)
        #test to error message
        Message = driver.find_element(By.CLASS_NAME, 'errorMessage')
        self.assertEqual("User with given email does not exist!", Message.text, "error message error")

        #true email
        Email.clear()
        Email.send_keys("a.bilalyildiz@gmail.com")
        Email.send_keys(Keys.RETURN)
        time.sleep(3)
        #test to confirm message
        ConfirmMessage = driver.find_element(By.CLASS_NAME, 'errorMessage')
        self.assertEqual("Reset password message is sending to your email!", ConfirmMessage.text, "confirm message error")

        #go to the sent link (false link)
        driver.get("https://refmes.herokuapp.com/login/reset-password/63a962f203a977d16ec39007/55b1cd6aa0d4dd2e88a3ee4511faf7501c310e4c832b6d41debf510a3b881e18/")
        time.sleep(3)

        incorrect_error = driver.find_element(By.CLASS_NAME, 'reset-password-error')
        self.assertEqual("Oops! The link is incorrect or expired, please try again!", incorrect_error.text, "incorrect error message error")
        time.sleep(3)


        #go to the sent link (correct link)
        driver.get("https://refmes.herokuapp.com/login/reset-password/63a962f203a977d16ec39007/55b1cd6aa0d4dd2e88a3ee4511faf7501c310e4c832b6d41debf510a3b881e19/")
        time.sleep(3)

        Password = driver.find_element(By.XPATH,"//input[@type='password']")
        Password.send_keys("8765432Bb!")
        Password.send_keys(Keys.RETURN)

        #wrong password confirmation
        Repassword = driver.find_element(By.XPATH,"//input[@type='repassword']")
        Repassword.send_keys("8765432Bb.")
        Repassword.send_keys(Keys.RETURN)
        time.sleep(3)

        #test the confirmation error
        confirm_error = driver.find_element(By.CLASS_NAME, 'errorMessage')
        self.assertEqual("Confirmation password is wrong, please try again!", confirm_error.text, "confirm error message error")
        
        #true password confirmation
        Repassword.clear()
        Repassword.send_keys("8765432Bb!")
        Repassword.send_keys(Keys.RETURN)
        time.sleep(3)

        #login with new password

        time.sleep(3)
        Email=driver.find_element(By.XPATH,"//input[@placeholder='Username']")
        Email.send_keys("abilal")
        Email.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("8765432Bb!")
        Password.send_keys(Keys.RETURN)
        time.sleep(3)

        element=driver.find_element(By.LINK_TEXT,"Log Out")
        element.click()
        time.sleep(3)

        #go to the sent link (expired link)
        driver.get("https://refmes.herokuapp.com/login/reset-password/63a962f203a977d16ec39007/55b1cd6aa0d4dd2e88a3ee4511faf7501c310e4c832b6d41debf510a3b881e19/")
        time.sleep(3)

        expired_error = driver.find_element(By.CLASS_NAME, 'reset-password-error')
        self.assertEqual("Oops! The link is incorrect or expired, please try again!", expired_error.text, "expired error message error")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()

"""class IsResetWithWrongEmail(unittest.TestCase): # test to reset password with wrong email
    def setUp(self):
        PATH_ABILAL="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_ABILAL)
        self.driver=webdriver.Chrome(service=ser)
    
    def test_send_email_in_reset_password(self):
        driver = self.driver
        time.sleep(2)
        driver.get(LOCAL_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        reset = driver.find_element(By.LINK_TEXT, "Reset it!")
        reset.click()
        time.sleep(2)

        Email=driver.find_element(By.XPATH,"//input[@type='email']")
        Email.send_keys("a.bilal@gmail.com")
        Email.send_keys(Keys.RETURN)
        time.sleep(3)
        #test to error message
        Message = driver.find_element(By.CLASS_NAME, 'errorMessage')
        self.assertEqual("User with given email does not exist!", Message.text, "error message error")

    def tearDown(self):
        self.driver.close()"""

"""class IsResetWithTrueEmail(unittest.TestCase): # test to reset password with wrong email
    def setUp(self):
        PATH_ABILAL="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_ABILAL)
        self.driver=webdriver.Chrome(service=ser)
    
    def test_send_email_in_reset_password(self):
        driver = self.driver
        time.sleep(2)
        driver.get(LOCAL_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        reset = driver.find_element(By.LINK_TEXT, "Reset it!")
        reset.click()
        time.sleep(2)

        Email=driver.find_element(By.XPATH,"//input[@type='email']")
        Email.send_keys("a.bilalyildiz@gmail.com")
        Email.send_keys(Keys.RETURN)
        time.sleep(3)
        #test to error message
        Message = driver.find_element(By.CLASS_NAME, 'errorMessage')
        self.assertEqual("Reset password message is sending to your email!", Message.text, "error message error")

    def tearDown(self):
        self.driver.close()"""