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

class numberOfClubs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT, "Login")
        element.click()
        time.sleep(2)
        Email=driver.find_element(By.XPATH,"//input[@name='username']")
        Email.send_keys("demo")
        Email.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("Demo123!")
        Password.send_keys(Keys.RETURN)
        time.sleep(2)
        refereeRatings=driver.find_elements(By.XPATH,"//div[@class='home-top-referees-inner-item home-top-referees-inner-item-rating']")
        max = refereeRatings[0].text
        for rating in refereeRatings:
            self.assertGreaterEqual(max, rating.text)
        time.sleep(4)

    def tearDown(self):
        self.driver.close()

class directedToPostMatchPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT, "Login")
        element.click()
        time.sleep(2)
        Email=driver.find_element(By.XPATH,"//input[@name='username']")
        Email.send_keys("demo")
        Email.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("Demo123!")
        Password.send_keys(Keys.RETURN)
        time.sleep(2)
        postMatchButton=driver.find_element(By.LINK_TEXT, "Give Post-Match Rating")
        postMatchButton.send_keys(Keys.RETURN)
        time.sleep(3)
        actualUrl = 'https://www.refmes.org/post-match'
        expectedUrl = driver.current_url
        self.assertTrue(expectedUrl.startswith(actualUrl))
        time.sleep(4)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()