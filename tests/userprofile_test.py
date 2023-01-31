import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

WEB_LINK="https://www.refmes.org/"
LOCAL_LINK="http://localhost:3000/"

class UserProfileEditLink(unittest.TestCase):
    def setUp(self):
        PATH_KUZU="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_KUZU)
        self.driver=webdriver.Chrome(service=ser)

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        username=driver.find_element(By.XPATH,"//input[@placeholder='Username']")
        username.send_keys("quzu3524")
        username.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("Enis123!")
        Password.send_keys(Keys.RETURN)
        time.sleep(3)
        Profile=driver.find_element(By.LINK_TEXT, "My Account")
        Profile.click()
        time.sleep(3)
        EditDiv=driver.find_element(By.XPATH,"//div[@class='user_edit_pen']")
        EditButton=EditDiv.find_element(By.ID,"userEditpen")
        EditButton.click()
        time.sleep(2)
        actualUrl = 'https://www.refmes.org/edit'
        expectedUrl = driver.current_url

        self.assertTrue(expectedUrl.startswith(actualUrl))
    def tearDown(self):
        self.driver.close()

class ProfileSectionCheck(unittest.TestCase):
    def setUp(self):
        PATH_KUZU="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_KUZU)
        self.driver=webdriver.Chrome(service=ser)

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        username=driver.find_element(By.XPATH,"//input[@placeholder='Username']")
        username.send_keys("quzu3524")
        username.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("Enis123!")
        Password.send_keys(Keys.RETURN)
        time.sleep(3)
        Profile=driver.find_element(By.LINK_TEXT, "My Account")
        Profile.click()
        time.sleep(3) 
        UserDiv=driver.find_elements(By.XPATH,"//p[@class='d-flex justify-content-center profile-subsection-text']")
        self.assertEqual("Email:",UserDiv[0].text)
        self.assertEqual("Username:",UserDiv[1].text)
        self.assertEqual("Full Name:",UserDiv[2].text)
        self.assertEqual("Total Comments:",UserDiv[3].text)
        time.sleep(3)
    def tearDown(self):
        self.driver.close()
if __name__ == "__main__":
    unittest.main()