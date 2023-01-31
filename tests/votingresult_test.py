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
class CorrectVotingURL(unittest.TestCase):
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
        Voting=driver.find_element(By.LINK_TEXT, "Referee Assignments")
        Voting.click()
        time.sleep(3)
        actualUrl = 'https://www.refmes.org/ratingresults'
        expectedUrl = driver.current_url
        self.assertTrue(expectedUrl.startswith(actualUrl))

    def tearDown(self):
        self.driver.close()

class ICheckRefereeLink(unittest.TestCase):
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
        Voting=driver.find_element(By.LINK_TEXT, "Referee Assignments")
        Voting.click()
        time.sleep(3)
        for index in range(0,9):
            eachRef=driver.find_elements(By.CLASS_NAME,"voting-result-box-middle-link")[index]
            eachRef.send_keys(Keys.RETURN)
            time.sleep(2)
            actualUrl = 'https://www.refmes.org/referee'
            expectedUrl = driver.current_url
            self.assertTrue(expectedUrl.startswith(actualUrl))
            driver.execute_script("window.history.go(-1)")
            time.sleep(3)
        
    def tearDown(self):
        self.driver.close()
if __name__ == "__main__":
    unittest.main()